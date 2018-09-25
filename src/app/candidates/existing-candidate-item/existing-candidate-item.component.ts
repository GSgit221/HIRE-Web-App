import { JobCandidate } from './../../models/job-candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-existing-candidate-item',
    templateUrl: './existing-candidate-item.component.html',
    styleUrls: ['./existing-candidate-item.component.scss']
})
export class ExistingCandidateItemComponent implements OnInit {
    activeSection = 'overview';
    activeInteractivity = 'chat';
    summaryContentShow = true;
    experienceContentShow = true;
    educationContentShow = true;
    jobId: string;
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
        this.jobService.getCandidate(this.jobId, this.candidateId)
            .subscribe((candidate: JobCandidate) => {
                this.candidate = candidate;
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

    // TO-DO: Sasha needs to create Directive instead of this ifs
    onToggleContent(paragraph: string) {
        if (paragraph === 'summary') {
            this.summaryContentShow = !this.summaryContentShow;
        } else if (paragraph === 'experience') {
            this.experienceContentShow = !this.experienceContentShow;
        } else if (paragraph === 'education') {
            this.educationContentShow = !this.educationContentShow;
        }
    }

}