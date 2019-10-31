import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { JobService } from '../../../../../core/services/job.service';
import * as fromJobsStore from '../store';
import { Job } from './../../../../../core/models/job';
import { FormHelperService } from './../../../../../core/services/form-helper.service';
import { UtilitiesService } from './../../../../../core/services/utilities.service';

@Component({
    selector: 'app-new-candidate-item',
    templateUrl: './new-candidate-item.component.html',
    styleUrls: ['./new-candidate-item.component.scss']
})
export class NewCandidateItemComponent implements OnInit {
    @Output() finishedCadidatesCreation = new EventEmitter<boolean>();
    @Input() jobId: string;
    @Input()
    set droppedFiles(files: File[]) {
        if (files) {
            this.processFiles(files);
        }
    }

    contentLoading = false;
    uploading = false;
    job: Job;
    form: FormGroup;
    emails: string[] = [];
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[];

    constructor(
        private jobService: JobService,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService,
        private renderer: Renderer2,
        private jobsStore: Store<fromJobsStore.JobsState>,
        private cdr: ChangeDetectorRef
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
        this.form = this.fb.group({
            // send_email: [true],
            file: [''],
            emails: this.fb.array([this.fb.control('', [Validators.required, Validators.email])]),
            permission: [false, Validators.requiredTrue]
        });
    }

    get emailInputs() {
        return this.form.get('emails') as FormArray;
    }

    addEmailInput() {
        this.emailInputs.push(this.fb.control('', [Validators.required, Validators.email]));
    }

    onEmailInputKeydown(event, formControl) {
        // if (event.keyCode === 13 && formControl.valid) {
        //     this.jobsStore
        //         .pipe(select(fromJobCandiatesSelector.getJobCandidates, { jobId: this.jobId }))
        //         .subscribe((candidates: any) => {
        //             const candidate = candidates.find((c) => c.email === formControl.value);
        //             console.log(candidate);
        //             if (!candidate) {
        //                 formControl.requestStatus = 'success';
        //                 formControl.pendingRequest = false;
        //                 this.emails.push(formControl.value);
        //             } else {
        //                 formControl.requestStatus = 'warning';
        //                 formControl.requestError = `Candidate with email ${formControl.value} already exists.`;
        //             }
        //             formControl.disable();
        //             formControl.pendingRequest = true;
        //             this.addEmailInput();
        //             this.onEmailInput = true;
        //         });
        // }
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log(formControl);
            if (formControl.valid && formControl.value) {
                formControl.disable();
                formControl.pendingRequest = true;
                this.jobService.createCandidateFromEmail(this.jobId, formControl.value).subscribe(
                    (candidate) => {
                        console.log(candidate);
                        formControl.requestStatus = 'success';
                        formControl.pendingRequest = false;
                        this.addEmailInput();

                        this.emails.push(formControl.value);
                    },
                    (response) => {
                        formControl.requestStatus = 'warning';
                        if (response && response.error && response.error.error) {
                            formControl.requestError = response.error.error;
                            console.error(response.error.error);
                        }
                        formControl.pendingRequest = false;
                        this.addEmailInput();
                    }
                );
            }
        }
    }

    onFinishClicked(event, consent = true) {
        event.preventDefault();
        console.log(this.emails, consent);
        if (this.emails.length && consent) {
            this.contentLoading = true;
            this.jobService.addJob(this.jobId, this.emails).subscribe(
                (response) => {
                    console.log(response);
                    this.contentLoading = false;
                    this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.jobId));
                    this.finishedCadidatesCreation.next(true);
                },
                (error) => console.error(error)
            );
            this.uploadQueue = [];
            this.emails = [];
        } else {
            this.uploadQueue = [];
            this.emails = [];
            this.finishedCadidatesCreation.next(true);
        }
        this.renderer.removeClass(document.body, 'over');
    }

    processFiles(files) {
        // console.log(files);
        for (let i = 0, file; (file = files[i]); i++) {
            // console.log(file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                // ADD TO THE QUEUE
                // console.log('We need to upload that file 🎈');
                this.uploadQueue.push({
                    id: this.utilities.generateUID(10),
                    file,
                    uploadStarted: false,
                    uploadFinished: false,
                    progress: 0,
                    success: false,
                    text: file.name
                });
            } else {
                this.uploadError = 'Only supported formats are: pdf, doc, docx, rtf, odt';
                setTimeout(() => (this.uploadError = null), 10000);
            }
        }
        this.processQueue();
        this.uploading = true;
    }

    onDropFile(files) {
        console.log('📥 onDropFile', files);
        this.processFiles(files);
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    processQueue() {
        this.uploadQueue.forEach((item, index) => {
            if (!item.uploadStarted && !item.uploadFinished) {
                setTimeout(() => {
                    this.uploadFile(item);
                }, index * 1000);
            }
        });
    }

    uploadFile(item) {
        if (item.success) {
            return;
        }

        this.utilities
            .readFile(item.file)
            .then((fileValue: any) => {
                item.uploadStarted = true;
                item.uploadFinished = false;
                item.progress = 0;
                let handle = setInterval(() => {
                    this.cdr.detectChanges();
                }, 100);

                const uploadProgressInterval = setInterval(() => {
                    item.progress = item.progress + 1 < 100 ? item.progress + 1 : item.progress;
                }, 400);
                const formData: { resume: any; email?: string } = {
                    resume: fileValue
                };
                if (item.email) {
                    formData.email = item.email;
                }
                this.jobService.createCandidateFromCv(this.jobId, formData).subscribe(
                    (response: HttpResponse<any>) => {
                        console.log('📬 Uploaded:', response);

                        const resp: any = response;
                        item.text = resp.candidate.email;
                        item.missingEmail = false;
                        item.progress = 100;
                        item.uploadFinished = true;
                        item.success = true;
                        clearInterval(uploadProgressInterval);
                        setTimeout(() => {
                            clearInterval(handle);
                        }, 1000);
                        this.emails.push(resp.candidate.email);
                        this.uploading = false;
                        // setTimeout(() => {
                        //     item.fadeout = true;
                        // }, 2000);

                        // Remove from upload queue
                        // setTimeout(() => {
                        //     const itemIndex = this.uploadQueue.findIndex((ui) => ui.id === item.id);
                        //     if (itemIndex !== -1) {
                        //         this.uploadQueue.splice(itemIndex, 1);
                        //     }
                        // }, 3000);
                    },
                    (response: HttpErrorResponse) => {
                        console.error(response);
                        item.text =
                            response &&
                            response.error &&
                            response.error.error &&
                            Object.keys(response.error.error).length
                                ? response.error.error
                                : 'Error';
                        if (item.text === 'Email address not found in resume. Please enter a valid email address') {
                            item.missingEmail = true;
                            item.email = '';
                        } else {
                            item.missingEmail = false;
                        }

                        if (item.text.includes('Candidate with email') && item.text.includes('already exists.')) {
                            item.colorGreen = true;
                            item.success = true;
                        }
                        this.uploading = false;
                        item.progress = 100;
                        item.uploadFinished = true;
                        clearInterval(uploadProgressInterval);
                        setTimeout(() => {
                            clearInterval(handle);
                        }, 1000);
                    }
                );
            })
            .catch((error) => {
                console.error(error);
                console.error('Error reading uploaded file');
            });
    }

    onMissingEmailSumbit(event, item) {
        event.preventDefault();
        const email = item.email;
        if (this.formHelper.validateEmail(email)) {
            this.uploadFile(item);
        }
    }
}
