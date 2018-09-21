import { JobService } from './../../services/job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Job } from './../../models/job';
import { Component, OnInit, Input } from '@angular/core';

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
    titleMaxLength = 250;
    editTitleMode = false;
    formIsSaving = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private jobService: JobService
    ) {
        this.statusOptions = [
            { label: 'LIVE', value: 'LIVE' },
            { label: 'BUILD', value: 'BUILD' }
        ];
    }
    ngOnInit() {
        this.jobTitleForm = this.fb.group({
            title: [this.job.title, Validators.required]
        });
    }

    onJobStatusChange(item) {
        console.log('status change', item.status);
        // this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    onCandidateClick($event) {
        console.log('Clicked on candidate', 'REDIRECT', `dashboard/jobs/${this.job.id}/candidate`);
        this.router.navigateByUrl(`dashboard/jobs/${this.job.id}/candidate`);
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

}
