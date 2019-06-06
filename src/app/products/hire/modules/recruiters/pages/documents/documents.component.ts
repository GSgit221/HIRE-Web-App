import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Message } from 'primeng/api';

import { FormHelperService } from './../../../../../../core/services/form-helper.service';
import { GeoService } from './../../../../../../core/services/geo.service';
import { RecruiterService } from './../../../../../../core/services/recruiter.service';
import { UtilitiesService } from './../../../../../../core/services/utilities.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    form: FormGroup;
    countryTypeOptions = [];
    initialCountry = 'za';
    uploadQueue: any[] = [];
    uploadError = {};
    uploadProgress = {};
    uploadFilename = {};
    contentLoading = false;
    bbeeeLevelOptions = [
        { label: 'Level 1', value: 1 },
        { label: 'Level 2', value: 2 },
        { label: 'Level 3', value: 3 },
        { label: 'Level 4', value: 4 },
        { label: 'Level 5', value: 5 },
        { label: 'Level 6', value: 6 },
        { label: 'Level 7', value: 7 },
        { label: 'Level 8', value: 8 }
    ];
    maxDate: Date;
    minDate: Date;
    minDateYearAgo: Date;
    msgs: Message[] = [];

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private router: Router,
        private utilities: UtilitiesService,
        private geoLocation: GeoService,
        private recruiterService: RecruiterService
    ) {
        this.countryTypeOptions = this.geoLocation.countriesList();
        this.initForm();

        this.recruiterService.getOnboarding().subscribe((data: any) => {
            this.contentLoading = false;
            if (data && data.documents) {
                this.populateForm(data.documents);
            }
        });
    }

    ngOnInit() {
        this.maxDate = moment(moment(), moment.defaultFormat).toDate();
        this.minDate = moment(moment().subtract(90, 'd'), moment.defaultFormat).toDate();
        this.minDateYearAgo = moment(moment().subtract(365, 'd'), moment.defaultFormat).toDate();
    }

    initForm() {
        this.form = this.fb.group({
            bbeeeCertificate: this.fb.group({
                status: ['', Validators.required],
                bbeee: this.fb.group({
                    file: [''],
                    level: [''],
                    expiry_date: ['']
                }),
                swornAffidavit: this.fb.group({
                    file: [''],
                    date_issued: ['']
                })
            }),
            taxClearanceCertificate: this.fb.group({
                file: ['', Validators.required],
                number: ['', Validators.required],
                expiry_date: ['', Validators.required]
            }),
            proofOfBankingDetails: this.fb.group({
                file: ['', Validators.required],
                date_issued: ['', Validators.required]
            })
        });
        this.onStatusChanges();
    }

    onStatusChanges() {
        this.form
            .get('bbeeeCertificate')
            .get('status')
            .valueChanges.subscribe((status) => {
                if (status === 'bbeee') {
                    const bbeee = this.bbeeeCertificate.get('bbeee');
                    bbeee.get('file').setValidators([Validators.required]);
                    bbeee.get('level').setValidators([Validators.required]);
                    bbeee.get('expiry_date').setValidators([Validators.required]);
                    bbeee.get('file').updateValueAndValidity();
                    bbeee.get('level').updateValueAndValidity();
                    bbeee.get('expiry_date').updateValueAndValidity();

                    const sworn = this.bbeeeCertificate.get('swornAffidavit');
                    sworn.get('file').clearValidators();
                    sworn.get('date_issued').clearValidators();
                    sworn.get('file').updateValueAndValidity();
                    sworn.get('date_issued').updateValueAndValidity();
                } else if (status === 'swornAffidavit') {
                    const bbeee = this.bbeeeCertificate.get('bbeee');
                    bbeee.get('file').clearValidators();
                    bbeee.get('level').clearValidators();
                    bbeee.get('expiry_date').clearValidators();
                    bbeee.get('file').updateValueAndValidity();
                    bbeee.get('level').updateValueAndValidity();
                    bbeee.get('expiry_date').updateValueAndValidity();

                    const sworn = this.bbeeeCertificate.get('swornAffidavit');
                    sworn.get('file').setValidators([Validators.required]);
                    sworn.get('date_issued').setValidators([Validators.required]);
                    sworn.get('file').updateValueAndValidity();
                    sworn.get('date_issued').updateValueAndValidity();
                }
            });
    }

    populateForm(data) {
        this.form.patchValue(data);
    }

    get bbeeeCertificate() {
        return this.form.controls['bbeeeCertificate'];
    }

    get taxClearanceCertificate() {
        return this.form.controls['taxClearanceCertificate'];
    }

    get proofOfBankingDetails() {
        return this.form.controls['proofOfBankingDetails'];
    }

    onDropFile(event, controlName, parentControlName = null) {
        const files = event.target.files || event.dataTransfer.files;
        const file = files[0];
        console.log('📥 onDropFile', file);
        if (file) {
            const control = parentControlName
                ? this.form
                      .get(parentControlName)
                      .get(controlName)
                      .get('file')
                : this.form.get(controlName).get('file');
            control.clearValidators();
            control.updateValueAndValidity();
            this.processFile(file, control, controlName);
        }
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    processFile(file, control, controlName) {
        console.log('processFile', controlName);
        if (this.validateFileType(file, ['application/pdf']) && file.size / 1024 / 1024 <= 5) {
            // ADD TO THE QUEUE
            console.log('We need to upload that file 🎈');
            this.uploadQueue.push({
                file,
                uploadStarted: false,
                uploadFinished: false,
                progress: 0,
                success: false,
                text: file.name
            });
            this.uploadError = { [controlName]: null };
            this.processQueue(control, controlName);
        } else {
            this.uploadFilename[controlName] = null;
            file.size / 1024 / 1024 <= 5
                ? (this.uploadError = { [controlName]: 'Only supported format pdf' })
                : (this.uploadError = {
                      [controlName]: 'File to big, maximum is 5MB'
                  });
            control.patchValue(null);
            control.setErrors({ invalid: true });
            control.updateValueAndValidity();
            console.log(control);
        }
    }

    processQueue(control, controlName) {
        // console.log('processQueu', this.uploadQueue);
        this.uploadQueue.forEach((item) => {
            if (!item.uploadStarted && !item.uploadFinished) {
                this.uploadFile(item, control, controlName);
            }
        });
    }

    uploadFile(item, control, controlName) {
        console.log('uploadFile', controlName);
        this.utilities.readFile(item.file).then((fileValue) => {
            item.uploadStarted = true;
            const data = {
                file: fileValue,
                type: controlName
            };
            this.uploadFilename[controlName] = fileValue.name;
            this.uploadProgress[controlName] = 0;
            const uploadProgressInterval = setInterval(() => {
                this.uploadProgress[controlName] += 10;
                console.log(this.uploadProgress[controlName]);
                if (this.uploadProgress[controlName] >= 100) {
                    clearInterval(uploadProgressInterval);
                    console.log('Inerval end');
                }
            }, 400);
            this.recruiterService.uploadDocument(data).subscribe(
                (response: any) => {
                    console.log(response);
                    clearInterval(uploadProgressInterval);
                    this.uploadProgress[controlName] = 100;
                    control.setValue(response.file);
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    onDatepickerKeydown(e) {
        const charCode = e.which ? e.which : e.keyCode;
        if (
            (charCode > 64 && charCode < 91) ||
            (charCode > 185 && charCode < 223) ||
            charCode === 32 ||
            (charCode > 36 && charCode < 41)
        ) {
            e.preventDefault();
        }
        if (e.target.value.length === 7 && charCode === 8) {
            e.target.value = e.target.value.slice(0, -2);
        }
        if (e.target.value.length === 12 && charCode === 8) {
            e.target.value = e.target.value.slice(0, -2);
        }
        if (e.target.value.length === 9 && charCode !== 8) {
            e.target.value = e.target.value + '/';
        }
        if (e.target.value.length === 4 && charCode !== 8) {
            e.target.value = e.target.value + '/';
        }
    }

    onDatepickerKeyup(e) {
        const charCode = e.which ? e.which : e.keyCode;
        const val = e.target.value;
        if (val.length === 4 && charCode !== 8) {
            e.target.value = val + '/';
        } else if (val.length === 9 && charCode !== 8) {
            e.target.value = val + '/';
        } else if (val.length === 12 && charCode === 8) {
            e.target.value = e.target.value.slice(0, -3);
        } else if (val.length === 7 && charCode === 8) {
            e.target.value = e.target.value.slice(0, -3);
        }
    }

    onBackClick(event) {
        event.preventDefault();
        this.recruiterService.onboardingBackClicked({ step: 'documents' });
    }

    onSaveClick(event) {
        event.preventDefault();
        const formValue = this.form.getRawValue();
        console.log('Save Form', formValue);
        this.recruiterService.onboardingStepSave({
            stepName: 'companyDetails',
            value: formValue
        });
    }

    onNextClick(event) {
        event.preventDefault();
        const form = this.form;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log(this.form);
            console.log('FORM IS INVALID:', form.value);
            return;
        }

        const formValue = form.value;
        console.log('FORM IS VALID', formValue);

        console.log(JSON.stringify(formValue));
        this.recruiterService.onboardingStepCompleted({ step: 'documents', stepName: 'documents', value: formValue });
    }
}
