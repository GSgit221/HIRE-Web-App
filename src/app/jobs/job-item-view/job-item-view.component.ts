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
    supportedFileTypes: string[];

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

        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
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

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFile', files);
        for (let i = 0, file; file = files[i]; i++) {
            console.log(file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                console.log('We need to upload that file 🎈');
                this.uploadQueue.push({
                    file: file,
                    uploadStarted: false,
                    uploadFinished: false,
                    progress: 0,
                    success: false,
                    text: file.name
                });
                this.processQueue();
            } else {
                this.uploadError = 'Only supported formats are: pdf, doc, docx, rtf, odt';
                setTimeout(() => this.uploadError = null, 10000);
            }
        }
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    processQueue() {
        this.uploadQueue.forEach(item => {
            if (!item.uploadStarted && !item.uploadFinished) {
                this.uploadFile(item);
            }
        });
    }

    uploadFile(item) {
        console.log(item);
        const data = new FormData();
        data.append('resume', item.file);
        item.uploadStarted = true;
        const uploadProgressInterval = setInterval(() => {
            item.progress = (item.progress + 1 < 97) ? item.progress + 1 : item.progress;
        }, 200);
        this.contentLoading = true;
        this.jobService.createCandidateFromCv(this.job.id, data)
            .subscribe((response: HttpResponse<any>) => {
                console.log('📬 Uploaded:', response);
                if (response.body && response.body.success) {
                    item.text = response.body.filename;
                    item.progress = 100;
                    item.uploadFinished = true;
                    item.success = true;
                    clearInterval(uploadProgressInterval);
                    this.contentLoading = false;
                }
            }, error => {
                console.error(error);
                item.text = error;
                item.progress = 100;
                item.uploadFinished = true;
                clearInterval(uploadProgressInterval);
                this.contentLoading = false;
            });
    }
}
