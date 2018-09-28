import { JobStage } from '../../models/job-stage';
import { JobService } from '../../services/job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Job } from '../../models/job';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

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
        // this.jobService.getStages(this.job.id).subscribe(stages => {
        //     console.log(stages);
        // });
    }

    onJobStatusChange(item) {
        console.log('status change', item.status);
        // this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    onCandidateClick($event) {
        console.log('Clicked on candidate', 'REDIRECT', `dashboard/jobs/${this.job.id}/candidate/candidateId`);
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate/candidateId`);
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
        return this.users.find((user: User) => user.user_id === id) || null;
    }

    onAddHiringManagerClick(event) {
        event.preventDefault();
        console.log('clicked');
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}?section=hiring-team&editMode=true`);
    }

    onFinishedCandidatesCreation(event) {
        this.createCandidateMode = false;
    }
}
