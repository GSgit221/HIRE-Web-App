import { JobCandidate } from './../../models/job-candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
    jobId: string;
    candidateId: string;


    constructor(
        private route: ActivatedRoute
    ) {
        this.jobId = this.route.snapshot.paramMap.get('jobId');
        this.candidateId = this.route.snapshot.paramMap.get('candidateId');
    }

    ngOnInit() {
    }
}
