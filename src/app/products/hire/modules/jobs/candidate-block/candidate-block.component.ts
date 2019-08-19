import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate, Job } from '../../../../../core/models';
import { JobService } from '../../../../../core/services';

@Component({
    selector: 'app-candidate-block',
    templateUrl: './candidate-block.component.html',
    styleUrls: ['./candidate-block.component.scss']
})
export class CandidateBlockComponent implements OnInit {
    @Input() candidate: Candidate;
    @Input() job: Job;
    @Input() resumeThreshold: number;
    @Input() selected: boolean;
    @Input() questionAnswer: Candidate;
    @Input() personalityAssessment: Candidate;
    @Input() video: Candidate;
    @Output() onDeleting = new EventEmitter<boolean>();
    @Output() deleted = new EventEmitter<string>();
    @Output() onSelect = new EventEmitter<string>();
    constructor(private jobService: JobService) {}

    ngOnInit() {}

    get hasStageData() {
        return this.personalityAssessment;
    }

    onDeleteCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.onDeleting.next(true);
        this.jobService.deleteCandidate(this.job.id, candidateId).subscribe(() => {
            this.deleted.next(candidateId);
        });
    }

    onSelectCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.onSelect.next(candidateId);
    }

    get hasRead() {
        const jobId = this.job.id;
        const { read = [] } = this.candidate;
        return read.length ? read.findIndex((jId) => jId === jobId) !== -1 : false;
    }
}
