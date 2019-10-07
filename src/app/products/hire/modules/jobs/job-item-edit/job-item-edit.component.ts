import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Message, SelectItem } from 'primeng/api';
import { UtilitiesService } from './../../../../../core/services/utilities.service';

import { Job } from '../../../../../core/models/job';
import { JobCatalogue } from '../../../../../core/models/job_catalogue';
import { User } from '../../../../../core/models/user';
import { FormHelperService } from '../../../../../core/services/form-helper.service';
import { JobService } from '../../../../../core/services/job.service';
import { ConditionalValidator } from '../../../../../core/validators/conditional.validator';
import { Questionnaire } from './../../../../../core/models/questionnaire';
import { QuestionnaireService } from './../../../../../core/services/questionnaire.service';
import { XLSXService } from './../../../../../core/services/xlsx.service';
import * as fromStore from './../../../../../store';
import * as fromSelectors from './../../../../../store/selectors';

@Component({
    selector: 'app-job-item-edit',
    templateUrl: './job-item-edit.component.html',
    styleUrls: ['./job-item-edit.component.scss']
})
export class JobItemEditComponent implements OnInit {
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    @ViewChild('locationInputRef') locationInputRef: ElementRef;
    jobDetailsForm: FormGroup;
    applicationsForm: FormGroup;
    hiringForm: FormGroup;

    @Input() job: Job;
    titleMaxLength = 250;

    @Output() setEditMode = new EventEmitter<boolean>();
    @Output() onJobUpdate = new EventEmitter<boolean>();

    user: User;
    users: User[];
    accountOwners: SelectItem[] = [];
    recruitersDefaults: SelectItem[] = [];
    recruiters: User[] = [];
    descriptions: JobCatalogue[] = [];
    // hiringManagers: SelectItem[] = [];
    // unprivilegedUsers: User[] = [];

    jobTypeOptions: SelectItem[];
    educationOptions: SelectItem[];
    hiresOptions: SelectItem[];
    experienceOptions: SelectItem[];
    salaryOptions: SelectItem[];
    joblistingOptions: SelectItem[];
    questionnaireOptions: SelectItem[];
    applicationFieldsOptions: SelectItem[];
    hiringManagersOptions: SelectItem[];
    JobDescriptionOptions: SelectItem[];

    activeSection = 'job-details';
    // activeSection = 'hiring-team';
    sections = ['job-details', 'applications', 'hiring-team'];
    contentLoading = false;
    disableDropdown = false;
    disableEdit = false;
    jobOwner = '';

    place: any;
    inputAddress: string;
    selectedJob: string;
    locationOptions: any;
    isJobOwner = false;
    msgs: Message[] = [];
    str_array = [];
    req_str_array = [];
    selectedOwner: any;
    baseUrl: string;

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
        private store: Store<fromStore.State>,
        private questionnaireService: QuestionnaireService,
        private fb: FormBuilder,
        private router: Router,
        private formHelper: FormHelperService,
        private xlsxService: XLSXService,
        private utilities: UtilitiesService
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.route.paramMap.subscribe((params: ParamMap) => {
            const section = this.route.snapshot.queryParamMap.get('section');
            // console.log('ROUTE CHANGE:', section);
            if (section && this.sections.indexOf(section) !== -1) {
                this.activeSection = section;
            }
        });

        // Options
        this.jobTypeOptions = [
            { label: 'Part-time', value: 'part-time' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Temporary', value: 'temporary' },
            { label: 'Contract', value: 'contract' }
        ];

        this.hiresOptions = [
            { label: '1 hire', value: 1 },
            { label: '2 hires', value: 2 },
            { label: '3 hires', value: 3 },
            { label: '4 hires', value: 4 },
            { label: '5 hires', value: 5 },
            { label: '6 hires', value: 6 },
            { label: '7 hires', value: 7 },
            { label: '8 hires', value: 8 },
            { label: '9 hires', value: 9 },
            { label: '10 hires', value: 10 },
            { label: 'Ongoing', value: 'ongoing' }
        ];

        this.educationOptions = [
            { label: 'Unspecified', value: 'unspecified' },
            { label: 'High School or Equivalent', value: 'school' },
            { label: 'Certification', value: 'certification' },
            { label: 'Vocational', value: 'vocational' },
            { label: 'Associate Degree', value: 'associate' },
            { label: 'Bachelors Degree', value: 'bachelors' },
            { label: 'Masters Degree', value: 'masters' },
            { label: 'Professional', value: 'professional' }
        ];

        this.experienceOptions = [
            { label: 'Internship', value: 'internship' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Entry Level', value: 'entry' },
            { label: 'Associate', value: 'associate' },
            { label: 'Mid Level', value: 'mid' },
            { label: 'Senior', value: 'senior' },
            { label: 'Executive', value: 'executive' }
        ];

        this.salaryOptions = [{ label: 'per year', value: 'yearly' }, { label: 'per month', value: 'monthly' }];

        this.joblistingOptions = [
            { label: 'Default - Visible', value: 'default' },
            { label: 'Auto-matching off', value: 'auto-matching-off' },
            { label: 'Hidden', value: 'hidden' }
        ];

        this.questionnaireOptions = [];
        this.questionnaireService.getAll().subscribe((questionnaires: Questionnaire[]) => {
            questionnaires
                .filter((q) => q.type === 'text')
                .forEach((q) => this.questionnaireOptions.push({ label: q.title, value: q.id }));
        });

        this.JobDescriptionOptions = [];
        this.xlsxService.getJobCatalogues().subscribe((descriptions: JobCatalogue[]) => {
            this.descriptions = descriptions;
            descriptions.forEach((q) => this.JobDescriptionOptions.push({ label: q.Role, value: q.Role }));
        });

        this.applicationFieldsOptions = [
            { label: 'Required', value: 'required' },
            { label: 'Optional', value: 'optional' },
            { label: 'Disabled', value: 'disabled' }
        ];

        this.hiringManagersOptions = [];
        this.locationOptions = {
            bounds: null,
            componentRestrictions: {
                country: []
            },
            types: ['(cities)']
        };
    }

    ngOnInit() {
        console.log('📓 JOB', this.job);
        if (this.job.description && this.job.requirements && this.job.job_role) {
            this.disableDropdown = true;
            this.disableEdit = true;
            this.selectedJob = this.job.job_role;
        }
        this.initForms();
        // Get current user
        this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = { ...user };
            if (this.job.owner === user.id || user.role === 'admin' || user.role === 'account_owner') {
                // console.log(user);
                this.isJobOwner = true;
                this.jobOwner = `${user.first_name} ${user.last_name}`;
                if (!this.hiringForm.get('default_email_name').value) {
                    this.hiringForm.patchValue({ default_email_name: this.user.first_name || '' });
                }
            }
        });

        //default selected job owner
        this.selectedOwner = this.job.default_email_name == this.jobOwner ? this.user.id : this.job.default_email_name;

        this.recruitersDefaults.push({
            label: `${this.user.first_name} ${this.user.last_name}`,
            value: `${this.user.id}`
        });

        // Get list of users
        this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.users = users.map((u) => ({ ...u }));
            this.accountOwners = [];
            this.users.forEach((user) => {
                if (user.role && ['recruiter', 'admin', 'account_owner'].indexOf(user.role) !== -1) {
                    const name = user.first_name ? `${user.first_name} ${user.last_name}` : user.email;
                    this.accountOwners.push({
                        label: name,
                        value: user.id
                    });
                }

                if (user.role && user.role === 'recruiter') {
                    this.recruiters.push(user);
                    this.recruitersDefaults.push({
                        label: `${user.first_name} ${user.last_name}`,
                        value: user.id
                    });
                }
            });

            if (this.user) {
                // sort this list
                const currentUserIndex = this.accountOwners.findIndex((ao) => ao.value === this.user.id);
                if (currentUserIndex !== -1) {
                    this.accountOwners = this.utilities.arrayMove(this.accountOwners, currentUserIndex, 0);
                }
            }
        });

        this.populateForms();
    }

    onChangeUser(event) {
        const user = this.users.filter((x) => x.id === event.value)[0];
        console.log('onChangeUser', user);
        this.jobOwner = `${user.first_name} ${user.last_name}`;
        if (!this.hiringForm.get('default_email_name').value) {
            this.hiringForm.patchValue({ default_email_name: user.first_name || '' });
        }
    }

    defineBullets(...args: string[]) {
        const str_array = [];
        const req_str_array = [];
        const removeOld = new RegExp('<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</p>', 'g');
        const res = args[0].replace(removeOld, '').split('● ');
        const req = args[1].replace(removeOld, '').split('● ');
        const prefix = res
            .shift()
            .split('  ')
            .join('<br>');
        const old = req.shift().trim();
        for (let i of res) {
            str_array.push('<li>' + i + '</li>');
        }
        for (let i of req) {
            req_str_array.push('<li>' + i + '</li>');
        }
        this.jobDetailsForm.patchValue({ description: `${prefix}<ul>${str_array.join('')}</ul>` });
        this.jobDetailsForm.patchValue({ requirements: `${old}<ul>${req_str_array.join('')}</ul>` });
    }

    onChangeJob(event) {
        this.selectedJob = event.value;
        const job_des = this.descriptions.filter((x) => x.Role === event.value);
        const description = `${job_des[0].Overview}  ${job_des[0].Description}  ${job_des[0].Responsibilities}`;
        this.defineBullets(description, job_des[0].Requirements);
    }

    // TEMPORARY (till Quill fixes it)
    private editorAutofocusFix() {
        setTimeout(() => {
            const el = document.querySelector('[formControlName]') as HTMLElement;
            if (el) {
                el.focus();
            }
            window.scrollTo(0, 0);
        }, 0);
    }

    private initForms() {
        this.jobDetailsForm = this.fb.group({
            title: [''],
            company: [''],
            ref: [''],
            location: [''],
            is_remote: [''],
            job_type: [''],
            number_of_hires: [''],
            salary: [''],
            salary_from: [''],
            education: [''],
            experience: [''],
            salary_to: [''],
            salary_period: [''],
            hide_salary: [''],
            description: [''],
            requirements: [''],
            job_role: ['']
        });
        this.applicationsForm = this.fb.group({
            job_listing: ['default'],
            resume_upload_required: [''],
            email_missing_info: [''],
            email_suggestions: [''],
            application_field_phone: [''],
            application_field_current_location: [''],
            application_field_employment_equity_status: [''],
            application_field_gender: [''],
            application_field_experience_summary: [''],
            application_field_work_history: [''],
            application_field_education: [''],
            application_field_cover_letter: [''],
            questionnaire: ['']
        });
        this.hiringForm = this.fb.group({
            owner: [''],
            recruiters: [''],
            hiring_managers: [''],
            default_email_name: ['']
        });

        this.editorAutofocusFix();
    }

    private populateForms() {
        // Forms
        this.jobDetailsForm = this.fb.group({
            title: [this.job.title, Validators.required],
            company: [this.job.company, Validators.required],
            ref: [this.job.ref],
            location: [
                { value: this.job.location, disabled: false },
                ConditionalValidator.validate(() => !this.job.is_remote, Validators.required)
            ],
            is_remote: [this.job.is_remote || false],
            job_type: [this.job.job_type, Validators.required],
            number_of_hires: [this.job.number_of_hires, Validators.required],
            education: [this.job.education, Validators.required],
            experience: [this.job.experience, Validators.required],
            salary_from: [this.job.salary_from],
            salary_to: [this.job.salary_to],
            // ConditionalValidator.validate(() => !this.job.single_salary, Validators.required)
            salary_period: [this.job.salary_period],
            hide_salary: [this.job.hide_salary || false],
            description: [''],
            requirements: [''],
            job_role: [this.job.job_role]
        });
        this.defineBullets(this.job.description, this.job.requirements);
        this.inputAddress = this.job.location;
        this.applicationsForm = this.fb.group({
            job_listing: [this.job.job_listing],
            resume_upload_required: [this.job.resume_upload_required],
            email_missing_info: [this.job.email_missing_info],
            email_suggestions: [this.job.email_suggestions],
            application_field_phone: [this.job.application_field_phone],
            application_field_current_location: [this.job.application_field_current_location],
            application_field_employment_equity_status: [this.job.application_field_employment_equity_status],
            application_field_gender: [this.job.application_field_gender],
            application_field_experience_summary: [this.job.application_field_experience_summary],
            application_field_work_history: [this.job.application_field_work_history],
            application_field_education: [this.job.application_field_education],
            application_field_cover_letter: [this.job.application_field_cover_letter],
            questionnaire: [{ value: this.job.questionnaire, disabled: false }]
        });
        this.hiringForm = this.fb.group({
            owner: [this.job.owner],
            hiring_managers: [this.job.hiring_managers],
            recruiters: [this.job.recruiters],
            default_email_name: [this.job.default_email_name]
        });
        this.editorAutofocusFix();

        // Location
        const locationControl = this.jobDetailsForm.get('location');
        this.jobDetailsForm.get('is_remote').valueChanges.subscribe((value) => {
            if (value) {
                locationControl.clearValidators();
                locationControl.updateValueAndValidity();
            } else {
                locationControl.setValidators([Validators.required]);
                locationControl.updateValueAndValidity();
            }
        });
    }

    onChangeSection(section: string) {
        this.activeSection = section;
        this.editorAutofocusFix();
    }

    toggleSalaryField() {
        this.job.single_salary = !this.job.single_salary;
        // const salaryToControl = this.jobDetailsForm.get('salary_to');
        // if (this.job.single_salary) {
        //     salaryToControl.clearValidators();
        //     salaryToControl.updateValueAndValidity();
        // } else {
        //     salaryToControl.setValidators([Validators.required]);
        // }
    }

    onSaveDraft(event) {
        event.preventDefault();
        const form = this.getActiveForm();
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('❌ FORM IS INVALID', form);
            return;
        }
        console.log('✅ FORM IS VALID', { ...this.job, ...form.value });
        this.jobService.saveJob({ ...this.job, ...form.value }, this.activeSection, false).subscribe((job: Job) => {
            console.log('RESPONSE FROM SAVE CALL:', job);
            this.contentLoading = false;
            if (job.created && job.id) {
                this.router.navigateByUrl(`${this.baseUrl}/jobs/${job.id}`);
            }
        });
    }

    onSave(event) {
        event.preventDefault();
        const form = this.getActiveForm();
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID');
            console.log(form);
            return;
        }
        // VALID
        console.log(this.job);
        console.log(form.value);
        this.jobService.saveJob({ ...this.job, ...form.value }, this.activeSection, true).subscribe((job: Job) => {
            console.log('RESPONSE FROM SAVE CALL:', job);
            this.contentLoading = false;
            if (job.created && job.id) {
                this.router.navigateByUrl(`${this.baseUrl}/jobs/${job.id}?section=applications`);
            } else {
                this.goToNextSection();
            }
        });
    }

    onSaveAll(event) {
        event.preventDefault();
        const dirtyForms = [];
        this.sections.forEach((section) => {
            const form = this.getActiveForm(section);
            if (form.dirty || form.touched) {
                dirtyForms.push({ section, form });
            }
        });
        let valid = true;
        for (let { section, form } of dirtyForms) {
            if (!form.valid) {
                this.formHelper.markFormGroupTouched(form);
                this.onChangeSection(section);
                valid = false;
                break;
            }
        }
        if (!valid || dirtyForms.length === 0) return;

        this.contentLoading = true;
        Promise.all(
            dirtyForms.map(
                ({ section, form }) =>
                    new Promise((resolve, reject) => {
                        this.jobService
                            .saveJob({ ...this.job, ...form.value }, section, true)
                            .subscribe(resolve, reject);
                    })
            )
        )
            .then((values) => {
                console.log(values);
                this.onJobUpdate.emit();
                this.contentLoading = false;
            })
            .catch((error) => {
                console.log(error.message);
                this.contentLoading = false;
            });
    }

    onLocationChange(address) {
        this.place = address;
        this.job.location = address && address.formatted_address ? this.locationInputRef.nativeElement.value : '';
        this.jobDetailsForm.patchValue({ location: this.job.location });
    }

    handleAddressTextChange(event) {
        setTimeout(() => {
            if (event.target.value !== this.job.location) {
                this.place = null;
                this.job.location = '';
                this.jobDetailsForm.patchValue({ location: this.job.location });
                this.inputAddress = '';
                this.placesRef.reset();
                this.locationInputRef.nativeElement.value = '';
            }
        }, 400);
    }

    private getActiveForm(activeSection: string = '') {
        const section = activeSection || this.activeSection;
        let form;
        switch (section) {
            case 'job-details':
                form = this.jobDetailsForm;
                break;
            case 'applications':
                form = this.applicationsForm;
                break;
            case 'hiring-team':
                form = this.hiringForm;
                break;
        }
        return form;
    }

    private goToNextSection() {
        const index = this.sections.indexOf(this.activeSection);
        if (index + 1 >= this.sections.length) {
            this.router.navigateByUrl(`${this.baseUrl}/jobs`);
        } else {
            const nextIndex = index + 1 < this.sections.length ? index + 1 : 0;
            this.activeSection = this.sections[nextIndex];
        }
    }

    get saveBtnText() {
        let text = 'Save';
        if (this.activeSection !== 'hiring-team') {
            text = 'Save and Next';
        } else {
            if (this.job.status && this.job.status === 'LIVE') {
                text = 'Save';
            } else {
                text = 'Save and Publish';
            }
        }
        return text;
    }

    get isNewOrDraft() {
        return this.job.status === 'BUILD';
    }

    onBackClick() {
        if (this.isNewOrDraft) {
            this.router.navigateByUrl(`${this.baseUrl}/jobs`);
        } else {
            this.setEditMode.emit(false);
        }
    }
}
