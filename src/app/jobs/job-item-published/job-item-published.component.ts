import { JobStage } from './../../models/job-stage';
import { JobService } from './../../services/job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Job } from './../../models/job';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
    selector: 'app-job-item-published',
    templateUrl: './job-item-published.component.html',
    styleUrls: ['./job-item-published.component.scss']
})
export class JobItemPublishedComponent implements OnInit {
    @Input() job: Job;
    statusOptions: SelectItem[];
    contentLoading = false;
    jobTitleForm: FormGroup;
    newJobStageForm: FormGroup;
    titleMaxLength = 250;
    editTitleMode = false;
    formIsSaving = false;
    stageFormIsSaving = false;
    appliedStage: JobStage;
    stages: JobStage[] = [];
    users: User[] = [];

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
        this.jobTitleForm = this.fb.group({
            title: [this.job.title, Validators.required]
        });
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

    onSaveTitle($event) {
        event.preventDefault();
        const formValue = this.jobTitleForm.value;
        this.formIsSaving = true;
        if (this.job.title !== formValue.title) {
            this.jobService.updateJob(this.job.id, formValue)
                .subscribe(() => {
                    this.formIsSaving = false;
                    this.editTitleMode = false;
                    this.job = Object.assign(this.job, formValue);
                });
        } else {
            this.formIsSaving = false;
            this.editTitleMode = false;
        }
    }

    onAddCandidateClick() {
        console.log('Add candidate');
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate/new`);
    }

    onNewJobStageFormSubmit(event) {
        event.preventDefault();
        const formValue = this.newJobStageForm.value;
        console.log(formValue);
        if (formValue && formValue.title && formValue.title.length) {
            this.stageFormIsSaving = true;
            this.jobService.createStage(this.job.id, formValue).subscribe((stage: JobStage) => {
                console.log(stage);
                this.stages.push(stage);
                this.stageFormIsSaving = false;
                this.newJobStageForm.reset();
            }, (error) => {
                this.stageFormIsSaving = false;
                console.error(error);
            });
        }
    }


    getHm(id: string) {
        return this.users.find((user: User) => user.user_id === id) || null;
    }
}
