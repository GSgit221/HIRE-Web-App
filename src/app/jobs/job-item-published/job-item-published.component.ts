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
    contentLoading = false;
    constructor(private router: Router) { }
    ngOnInit() {
        
    }

    onCandidateClick($event) {
        console.log('Clicked on candidate', 'REDIRECT', `dashboard/jobs/${this.job.id}/candidate`);
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate`);
    }

}
