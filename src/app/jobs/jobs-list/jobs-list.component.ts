import { Job } from './../../models/job';
import { Component, OnInit } from '@angular/core';

import { Router } from '../../../../node_modules/@angular/router';
import { JobService } from './../../services/job.service';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    contentLoading = true;
    list = [];

    constructor(private router: Router, private jobService: JobService) {
        this.jobService.getAll()
            .subscribe((jobs: Job[]) => {
                this.list = jobs;
                this.contentLoading = false;
            });
    }

    ngOnInit() {

    }

    onItemClick(event, item) {
        event.preventDefault();
        this.router.navigate([`/dashboard/jobs/${item.id}`]);
    }

}
