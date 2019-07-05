import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from './../../../../../core/models/job';
import { JobService } from './../../../../../core/services/job.service';

import { Candidate } from './../../../../../core/models/candidate';

@Component({
    selector: 'app-candidate-block',
    templateUrl: './candidate-block.component.html',
    styleUrls: ['./candidate-block.component.scss']
})
export class CandidateBlockComponent implements OnInit {
    @Input() candidate: Candidate;
    @Input() job: Job;
    @Input() resumeThreshold: number;
    @Output() onDeleting = new EventEmitter<boolean>();
    @Output() deleted = new EventEmitter<string>();
    constructor(private jobService: JobService) {}

    ngOnInit() {}

    onDeleteCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.onDeleting.next(true);
        this.jobService.deleteCandidate(this.job.id, candidateId).subscribe(() => {
            this.deleted.next(candidateId);
        });
    }
}
