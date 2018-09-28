import { Job } from './../../models/job';
import { FormHelperService } from './../../services/form-helper.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-new-candidate-item',
    templateUrl: './new-candidate-item.component.html',
    styleUrls: ['./new-candidate-item.component.scss']
})
export class NewCandidateItemComponent implements OnInit {
    @Output() finishedCadidatesCreation = new EventEmitter<boolean>();
    @Input() jobId: string;
    contentLoading = false;
    job: Job;
    form: FormGroup;
    resume: File;
    emails: string[] = [];
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[];

    constructor(
        private jobService: JobService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) {
        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    ngOnInit() {
        console.log(this.jobId);
        this.form = this.fb.group({
            send_email: [true],
            emails: this.fb.array([
                this.fb.control('', [Validators.required, Validators.email])
            ])
        });
    }

    get emailInputs() {
        return this.form.get('emails') as FormArray;
    }

    addEmailInput() {
        this.emailInputs.push(this.fb.control('', [Validators.required, Validators.email]));
    }

    onEmailInputKeydown(event, formControl) {
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log(formControl);
            if (formControl.valid && formControl.value) {
                formControl.disable();
                formControl.pendingRequest = true;
                this.jobService.createCandidateFromEmail(this.jobId, formControl.value)
                    .subscribe(candidate => {
                        console.log(candidate);
                        formControl.requestStatus = 'success';
                        formControl.pendingRequest = false;
                        this.addEmailInput();

                        this.emails.push(formControl.value);
                    }, (response) => {
                        formControl.requestStatus = 'warning';
                        if (response && response.error && response.error.error) {
                            formControl.requestError = response.error.error;
                            console.error(response.error.error);
                        }
                        formControl.pendingRequest = false;
                        this.addEmailInput();
                    });
            }
        }
    }

    onFinishClicked(event) {
        event.preventDefault();
        console.log(this.form.value);
        console.log(this.emails);
        if (this.form.value.send_email && this.emails.length) {
            this.jobService.sendEmailsToCandidates(this.jobId, this.emails)
                .subscribe(response => console.log(response), error => console.error(error));
            this.uploadQueue = [];
            this.emails = [];
            this.finishedCadidatesCreation.next(true);
        } else {
            this.uploadQueue = [];
            this.emails = [];
            this.finishedCadidatesCreation.next(true);
        }
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFile', files);
        for (let i = 0, file; file = files[i]; i++) {
            console.log(file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                // ADD TO THE QUEUE
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
        // SHOW CORRECT STATUS CIRCLE
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
        this.jobService.createCandidateFromCv(this.jobId, data)
            .subscribe((response: HttpResponse<any>) => {
                console.log('📬 Uploaded:', response);
                if (response.body && response.body.success) {
                    item.text = response.body.filename;
                    item.progress = 100;
                    item.uploadFinished = true;
                    item.success = true;
                    clearInterval(uploadProgressInterval);
                    // TODO Add parsed email to the emails list
                }
            }, error => {
                console.error(error);
                item.text = error;
                item.progress = 100;
                item.uploadFinished = true;
                clearInterval(uploadProgressInterval);
            });
    }

    // onSave() {
    //     const form = this.form;
    //     if (!form.valid) {
    //         this.formHelper.markFormGroupTouched(form);
    //         console.log('FORM IS INVALID:', form);
    //         return;
    //     }
    //     // VALID
    //     console.log('FORM IS VALID:', form.value);
    //     const data = new FormData();
    //     data.append('email', form.value.email);
    //     data.append('resume', this.resume);
    //     console.log(data);
    //     this.contentLoading = true;
    //     this.jobService.createCandidate(this.jobId, data)
    //         .subscribe(candidate => {
    //             console.log(candidate);
    //             this.contentLoading = false;
    //             this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
    //             // TODO: redirect to candidate page
    //         }, error => {
    //             console.log(error);
    //             this.contentLoading = false;
    //         });

    // }

    // onFileChange(event) {
    //     const reader = new FileReader();
    //     if (event.target.files && event.target.files.length > 0) {
    //         this.resume = event.target.files[0];
    //         // const file = event.target.files[0];
    //         // reader.readAsDataURL(file);
    //         // reader.onload = () => {
    //         //     const encodedString: any = reader.result;
    //         //     this.resume = {
    //         //         filename: file.name,
    //         //         filetype: file.type,
    //         //         value: encodedString.split(',')[1]
    //         //     };
    //         // };
    //     } else {
    //         // this.resume = {
    //         //     filename: null,
    //         //     filetype: null,
    //         //     value: null
    //         // };
    //         this.resume = null;
    //     }
    // }

    // get resumeField() {
    //     return this.form.get('resume');
    // }


    // onBackClick() {
    //     this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
    // }

}
