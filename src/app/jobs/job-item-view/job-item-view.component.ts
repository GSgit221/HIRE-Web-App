import { JobCandidate } from './../../models/job-candidate';
import { JobStage } from '../../models/job-stage';
import { JobService } from '../../services/job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Job } from '../../models/job';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-job-item-view',
    templateUrl: './job-item-view.component.html',
    styleUrls: ['./job-item-view.component.scss']
})
export class JobItemViewComponent implements OnInit {
    @Input() job: Job;
    @Output() setEditMode = new EventEmitter<boolean>();
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

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private jobService: JobService
    ) {
        this.statusOptions = [
            { label: 'LIVE', value: 'LIVE' },
            { label: 'BUILD', value: 'BUILD' }
        ];

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
            console.log(this.users);
        });
    }
    ngOnInit() {
        this.newJobStageForm = this.fb.group({
            title: ['']
        });
        this.appliedStage = this.job.stages.find(stage => stage.id === 'applied');
        this.stages = this.job.stages.filter(stage => stage.id !== 'applied');
        this.jobService.getCandidates(this.job.id).subscribe((candidates: JobCandidate[]) => {
            console.log(candidates);
            this.candidates = candidates;
        });
    }

    onJobStatusChange(item) {
        // console.log('status change', item.status);
        this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    stageCandidates(stageName: string) {
        if (this.candidates && this.candidates.length) {
            const sC: JobCandidate[] = [];
            this.candidates.forEach(c => {
                if (c.stage && c.stage[this.job.id]) {
                    if (c.stage[this.job.id] === stageName) {
                        sC.push(c);
                    }
                } else {
                    sC.push(c);
                }
            });
            return sC;
        } else {
            return [];
        }
    }

    onCandidateClick(candidateId) {
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate/${candidateId}`);
    }

    onSettigsClick(stageId: string) {
        console.log('Clicked on stage settings:', stageId);
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
        console.log(formValue);
        if (formValue && formValue.title && formValue.title.length) {
            this.stageFormIsSaving = true;
            this.jobService.createStage(this.job.id, formValue).subscribe((stage: JobStage) => {
                console.log(stage);
                this.stages.push(stage);
                this.stageFormIsSaving = false;
                this.newJobStageForm.reset();
                this.createStageMode = false;
            }, (error) => {
                this.stageFormIsSaving = false;
                console.error(error);
            });
        }
    }


    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    onAddHiringManagerClick(event) {
        event.preventDefault();
        console.log('clicked');
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}?section=hiring-team&editMode=true`);
    }

    onFinishedCandidatesCreation(event) {
        this.jobService.getCandidates(this.job.id).subscribe((candidates: any[]) => {
            console.log(candidates);
            this.candidates = candidates;
        });
        this.createCandidateMode = false;
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        this.createCandidateMode = true;
    }

    onDeleteCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.contentLoading = true;
        this.jobService.deleteCandidate(this.job.id, candidateId).subscribe(() => {
            this.jobService.getCandidates(this.job.id).subscribe((candidates: any[]) => {
                this.candidates = candidates;
                this.contentLoading = false;
            });
        });
    }

    onCandidateDrop(event, stageId) {
        console.log('drop', event.dragData, stageId);
        const candidate = event.dragData;
        const candidateIndex = this.candidates.findIndex(c => c.id === candidate.id);
        this.candidates[candidateIndex].stage[this.job.id] = stageId;
        this.jobService.updateCandidateStage(this.job.id, candidate.id, this.candidates[candidateIndex].stage).subscribe(() => {
            console.log('Candidate stage was updated to:', stageId);
        });
    }
}
