import { JobCandidate } from './../../models/job-candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
    activeSection = 'overview';
    activeInteractivity = 'chat';
    summaryContentShow = true;
    experienceContentShow = true;
    educationContentShow = true;
    jobId: string;
    job: Job;
    candidateId: string;

    candidate: JobCandidate;

    contentLoading = true;


    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.jobId = this.route.snapshot.paramMap.get('jobId');
        this.candidateId = this.route.snapshot.paramMap.get('candidateId');
        this.jobService.getJob(this.jobId).subscribe((job: Job) => this.job = job);
        this.jobService.getCandidate(this.jobId, this.candidateId)
            .subscribe((candidate: JobCandidate) => {
                this.candidate = candidate;
                console.log(this.candidate);
                setTimeout(() => this.contentLoading = false, 200);
                console.log('FROM ROUTE-------------------- JOB:', this.jobId, this.candidateId);
            });
    }

    ngOnInit() {
    }


    onChangeSection(section: string) {
        this.activeSection = section;
    }


    onChangeInteractivity(section: string) {
        this.activeInteractivity = section;
    }

    onBackClick() {
        this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
    }

}
