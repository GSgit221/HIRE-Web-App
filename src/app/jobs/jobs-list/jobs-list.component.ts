import { SelectItem } from 'primeng/api';
import { Job } from './../../models/job';
import { Component, OnInit } from '@angular/core';

import { Router } from '../../../../node_modules/@angular/router';
import { JobService } from './../../services/job.service';
import { UtilitiesService } from './../../services/utilities.service';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    contentLoading = true;
    list = [];
    statusOptions: SelectItem[];

    constructor(private router: Router, private jobService: JobService, private Utilities: UtilitiesService) {
        this.jobService.getAll()
            .subscribe((jobs: Job[]) => {
                this.list = jobs;
                this.contentLoading = false;
            });


        this.statusOptions = [
            { label: 'LIVE', value: 'LIVE' },
            { label: 'BUILD', value: 'BUILD' }
        ];
    }

    ngOnInit() {

    }

    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = this.Utilities.getClosest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            console.log('REDIRECT');
            this.router.navigate([`/dashboard/jobs/${item.id}`]);
        }
    }

    onStatusChange(event, item) {
        console.log(event);
        console.log(item);
        this.jobService.updateJob(item.id, {status: item.status}).subscribe(() => console.log('updated'));
    }

}
