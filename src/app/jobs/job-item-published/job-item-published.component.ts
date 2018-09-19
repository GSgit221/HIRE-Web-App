import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Job } from './../../models/job';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-job-item-published',
    templateUrl: './job-item-published.component.html',
    styleUrls: ['./job-item-published.component.scss']
})
export class JobItemPublishedComponent implements OnInit {
    @Input() job: Job;
    statusOptions: SelectItem[];
    contentLoading = false;
    constructor(private router: Router) {
        this.statusOptions = [
            { label: 'LIVE', value: 'LIVE' },
            { label: 'BUILD', value: 'BUILD' }
        ];
    }
    ngOnInit() {

    }

    onJobStatusChange(item) {
        console.log('status change', item.status);
        // this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    onCandidateClick($event) {
        console.log('Clicked on candidate', 'REDIRECT', `dashboard/jobs/${this.job.id}/candidate`);
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate`);
    }

    onSettigsClick(stageId: string) {
        console.log('Clicked on stage settings:', stageId);
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/stages/${stageId}`);
    }

}
