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
    constructor() { }
    ngOnInit() {
        console.log('published component');
    }

}
