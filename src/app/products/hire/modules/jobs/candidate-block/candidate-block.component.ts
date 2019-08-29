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
    @Input() questionAnswer: any;
    @Input() personalityAssessment: any;
    @Input() video: any;
    @Output() onDeleting = new EventEmitter<boolean>();
    @Output() deleted = new EventEmitter<string>();
    @Output() onSelect = new EventEmitter<string>();
    constructor(private jobService: JobService) {}

    ngOnInit() {}

    get hasStageData() {
        return this.personalityAssessment === 'applied'
            ? this.hasQuestion && !this.questionAnswer && this.candidate.score >= this.resumeThreshold
            : this.personalityAssessment;
    }

    get hasQuestion() {
        return (
            this.candidate &&
            this.candidate.job_specific &&
            this.candidate.job_specific.questions &&
            this.candidate.job_specific.questions[this.job.id]
        );
    }

    titleCase(str: string) {
        return str
            .replace(/#/g, '')
            .split(/[-|_]/g)
            .join(' ')
            .replace(/\w*\S/g, (t) => t[0].toUpperCase() + t.substr(1));
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
