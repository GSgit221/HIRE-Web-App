import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

import { Job } from '../../models/job';
import { JobStage } from '../../models/job-stage';
import { User } from '../../models/user';
import { JobService } from '../../services/job.service';
import { JobCandidate } from './../../models/job-candidate';

@Component({
    selector: 'app-job-item-view',
    templateUrl: './job-item-view.component.html',
    styleUrls: ['./job-item-view.component.scss']
})
export class JobItemViewComponent implements OnInit {
    @Input() job: Job;
    @Output() setEditMode = new EventEmitter<boolean>();
    initialLoad = false;
    statusOptions: SelectItem[];
    contentLoading = false;
    newJobStageForm: FormGroup;
    formIsSaving = false;
    stageFormIsSaving = false;
    appliedStage: JobStage;
    stages: JobStage[] = [];
    users: User[] = [];
    createStageMode = false;
    createCandidateMode = false;
    uploadQueue: any[] = [];
    uploadError: string;
    droppedFiles: File[] = [];
    candidates: JobCandidate[];
    draggedCandidate: JobCandidate;
    appliedCandidates: any;
    resumeThreshold = 60;

    constructor(private router: Router, private fb: FormBuilder, private jobService: JobService) {
        this.statusOptions = [{ label: 'LIVE', value: 'LIVE' }, { label: 'BUILD', value: 'BUILD' }];

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
            // console.log(this.users);
        });

        this.appliedCandidates = {
            visible: [],
            hidden: [],
            total: 0
        };
    }
    ngOnInit() {
        this.newJobStageForm = this.fb.group({
            title: ['']
        });
        this.appliedStage = this.job.stages.find((stage) => stage.id === 'applied');
        this.stages = this.job.stages.filter((stage) => stage.id !== 'applied').sort((a, b) => a.order - b.order);
        this.jobService.getCandidates(this.job.id).subscribe((candidates: JobCandidate[]) => {
            // console.log(candidates);
            this.initialLoad = true;
            this.candidates = candidates;
            this.setAppliedCanidates(this.candidates);
        });
        this.resumeThreshold = this.getJobResumeMatchingThreshold();
    }

    onJobStatusChange(item) {
        // console.log('status change', item.status);
        this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    stageCandidates(stageName: string) {
        if (this.candidates && this.candidates.length) {
            const sC: JobCandidate[] = [];
            this.candidates.forEach((c) => {
                if (c.stage && c.stage[this.job.id]) {
                    if (c.stage[this.job.id] === stageName) {
                        sC.push(c);
                    }
                } else {
                    if (stageName === 'applied') {
                        sC.push(c);
                    }
                }
            });
            return sC;
        } else {
            return [];
        }
    }

    setAppliedCanidates(candidates: JobCandidate[]) {
        const sC: JobCandidate[] = [];
        candidates.forEach((c) => {
            if (c.stage && c.stage[this.job.id]) {
                if (c.stage[this.job.id] === 'applied') {
                    sC.push(c);
                }
            } else {
                sC.push(c);
            }
        });

        const applied = {
            visible: [],
            hidden: [],
            total: sC.length
        };
        sC.forEach((c) => {
            if (c.score >= this.resumeThreshold - 15) {
                applied.visible.push(c);
            } else {
                applied.hidden.push(c);
            }
        });

        this.appliedCandidates = applied;
    }

    onLoadMore() {
        const items = this.appliedCandidates.hidden.splice(0, this.appliedCandidates.hidden.length);
        this.appliedCandidates.visible = [...this.appliedCandidates.visible, ...items];
    }

    onCandidateClick(candidateId) {
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate/${candidateId}`);
    }

    onSettigsClick(stageId: string) {
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/stages/${stageId}`);
    }

    onEditJobClick(event) {
        event.preventDefault();
        this.setEditMode.emit(true);
    }

    onAddCandidateClick() {
        this.createCandidateMode = true;
    }

    onStageNameKeydown(event) {
        if (event && event.keyCode && event.keyCode === 13) {
            this.onNewJobStageFormSubmit();
        }
    }

    onNewJobStageFormSubmit() {
        const formValue = this.newJobStageForm.value;
        if (formValue && formValue.title && formValue.title.length) {
            this.stageFormIsSaving = true;
            this.jobService.createStage(this.job.id, formValue).subscribe(
                (stage: JobStage) => {
                    this.stages.push(stage);
                    this.stageFormIsSaving = false;
                    this.newJobStageForm.reset();
                    this.createStageMode = false;
                },
                (error) => {
                    this.stageFormIsSaving = false;
                    console.error(error);
                }
            );
        }
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    onAddHiringManagerClick(event) {
        event.preventDefault();
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}?section=hiring-team&editMode=true`);
    }

    onFinishedCandidatesCreation(event) {
        this.jobService.getCandidates(this.job.id).subscribe((candidates: any[]) => {
            // console.log(candidates);
            this.candidates = candidates;
            this.setAppliedCanidates(this.candidates);
        });
        this.createCandidateMode = false;
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        // console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        this.createCandidateMode = true;
    }

    onDeleteCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.contentLoading = true;
        this.jobService.deleteCandidate(this.job.id, candidateId).subscribe(() => {
            this.contentLoading = false;
            const index = this.candidates.findIndex((c) => c.id === candidateId);
            this.candidates.splice(index, 1);

            const visibleIndex = this.appliedCandidates.visible.findIndex((c) => c.id === candidateId);
            this.appliedCandidates.visible.splice(visibleIndex, 1);

            this.appliedCandidates.total = this.appliedCandidates.visible.length + this.appliedCandidates.hidden.length;
        });
    }

    onCandidateDrop(event, stageId) {
        // console.log('drop', event.dragData, stageId);
        const candidate = event.dragData;
        const candidateIndex = this.candidates.findIndex((c) => c.id === candidate.id);
        this.candidates[candidateIndex].stage[this.job.id] = stageId;
        this.jobService
            .updateCandidateStage(this.job.id, candidate.id, this.candidates[candidateIndex].stage)
            .subscribe(() => {
                console.log('Candidate stage was updated to:', stageId);
            });
        this.setAppliedCanidates(this.candidates);
    }

    getJobResumeMatchingThreshold() {
        let threshold = 60;
        if (this.job && this.job.stages && this.job.stages.find((s) => s.id === 'applied')) {
            const appliedStage = this.job.stages.find((s) => s.id === 'applied');
            threshold = appliedStage.resume_matching_threshold;
        }
        return threshold;
    }
}
