import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';

import { Job } from '../../../models/job';
import { JobStage } from '../../../models/job-stage';
import { User } from '../../../models/user';
import { JobService } from '../../../services/job.service';
import { JobCandidate } from './../../../models/job-candidate';
import { CandidateService } from './../../../services/candidate.service';
import * as fromStore from './../../../store';

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
    user: User;
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
    candidateIsDragged = false;
    draggedStage: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private jobService: JobService,
        private candidateService: CandidateService,
        private store: Store<fromStore.State>
    ) {
        this.statusOptions = [{ label: 'LIVE', value: 'LIVE' }, { label: 'BUILD', value: 'BUILD' }];

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
        });

        this.appliedCandidates = {
            visible: [],
            hidden: [],
            total: 0
        };
    }
    ngOnInit() {
        this.store.pipe(select(fromStore.getUserEntity)).subscribe((user: User) => {
            this.user = user;
        });
        this.newJobStageForm = this.fb.group({
            title: ['']
        });
        this.appliedStage = this.job.stages.find((stage) => stage.id === 'applied');
        this.stages = this.job.stages.filter((stage) => stage.id !== 'applied').sort((a, b) => a.order - b.order);
        this.jobService.getCandidates(this.job.id).subscribe((candidates: JobCandidate[]) => {
            this.initialLoad = true;
            this.candidates = candidates.map((c) => {
                if (c.email.indexOf('dimensiondata') !== -1) {
                    c.isDdEmployee = true;
                }
                if (
                    c.employment_history &&
                    c.employment_history.length &&
                    c.employment_history[0].end_date === 'current'
                ) {
                    if (c.employment_history[0].title.indexOf('Dimension Data') !== -1) {
                        c.isDdEmployee = true;
                    }
                }
                return c;
            });
            this.setAppliedCanidates(this.candidates);
        });
        this.resumeThreshold = this.getJobResumeMatchingThreshold();
    }

    onJobStatusChange(item) {
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
        console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        if (this.droppedFiles && this.droppedFiles.length) {
            this.createCandidateMode = true;
        }
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
        this.candidateIsDragged = false;
        const candidate = event.dragData;
        const candidateIndex = this.candidates.findIndex((c) => c.id === candidate.id);
        const stageFromId = this.candidates[candidateIndex].stage[this.job.id] || 'applied';
        const stageToId = stageId;

        if (stageFromId !== stageToId) {
            this.candidates[candidateIndex].stage[this.job.id] = stageId;
            this.jobService
                .updateCandidateStage(this.job.id, candidate.id, this.candidates[candidateIndex].stage)
                .subscribe(() => {
                    console.log('Candidate stage was updated to:', stageId);
                    this.candidateService
                        .addToAudit(this.job.id, candidate.id, {
                            type: 'stages_progress',
                            user_id: this.user.id,
                            stage_from_id: stageFromId,
                            stage_to_id: stageToId,
                            created_at: new Date().getTime()
                        })
                        .subscribe(
                            (response) => {
                                console.log(response);
                            },
                            (errorResponse) => {
                                console.error(errorResponse);
                            }
                        );
                });
        }
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

    onCandidateDragStart() {
        this.candidateIsDragged = true;
    }

    onCandidateDragEnd() {
        this.candidateIsDragged = false;
    }

    onStageDragStart(stage) {
        this.draggedStage = stage;
    }

    onStageDragEnd() {
        this.draggedStage = null;
    }

    onStageDragOver(event, order) {
        if (order !== this.draggedStage.order) {
            const draggedOverStageIndex = this.stages.findIndex((s) => s.order === order);
            const draggedStageIndex = this.stages.findIndex((s) => s.order === this.draggedStage.order);
            this.stages.splice(draggedStageIndex, 1);
            this.stages.splice(draggedOverStageIndex, 0, this.draggedStage);
            this.stages.forEach((s, index) => {
                s.order = index + 1;
            });

            this.jobService
                .updateStages(this.job.id, this.stages)
                .subscribe(
                    () => console.log('Stages order was updated'),
                    (errorResponse) => console.error(errorResponse)
                );
        }
    }

    onCandidateDeleteDrop(event) {
        const deleteItem = event.dragData;
        if (deleteItem) {
            this.onDeleteCandidateClick(event.nativeEvent, deleteItem.id);
        }
    }
}
