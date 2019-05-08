import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Message, SelectItem } from 'primeng/api';

import { Job } from '../../../core/models/job';
import { User } from '../../../core/models/user';
import { FormHelperService } from '../../../core/services/form-helper.service';
import { JobService } from '../../../core/services/job.service';
import { ConditionalValidator } from '../../../core/validators/conditional.validator';
import { Questionnaire } from './../../../core/models/questionnaire';
import { QuestionnaireService } from './../../../core/services/questionnaire.service';
import * as fromStore from './../../../store';
import * as fromSelectors from './../../../store/selectors';

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

    user: User;
    users: User[];
    accountOwners: SelectItem[] = [];
    recruiters: User[] = [];
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

    activeSection = 'job-details';
    // activeSection = 'hiring-team';
    sections = ['job-details', 'applications', 'hiring-team'];
    contentLoading = false;
    jobOwner = '';

    place: any;
    inputAddress: string;
    locationOptions: any;
    isJobOwner = false;
    msgs: Message[] = [];

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
        private store: Store<fromStore.State>,
        private questionnaireService: QuestionnaireService,
        private fb: FormBuilder,
        private router: Router,
        private formHelper: FormHelperService
    ) {
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

        this.joblistingOptions = [{ label: 'Default', value: 'default' }];

        this.questionnaireOptions = [];
        this.questionnaireService.getAll().subscribe((questionnaires: Questionnaire[]) => {
            questionnaires.forEach((q) => this.questionnaireOptions.push({ label: q.title, value: q.id }));
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
        this.initForms();
        // Get current user
        this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = { ...user };
            if (this.job.owner === user.id || user.role === 'admin') {
                this.isJobOwner = true;
                this.jobOwner = `${user.first_name} ${user.last_name}`;
                this.hiringForm.patchValue({ default_email_name: this.jobOwner, owner: user.id });
            }
        });

        // Get list of users
        this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.users = users.map((u) => ({ ...u }));
            this.accountOwners = [];
            this.users.forEach((user) => {
                if (user.role && ['user', 'admin', 'account_owner'].indexOf(user.role) !== -1) {
                    this.accountOwners.push({
                        label: `${user.first_name} ${user.last_name}`,
                        value: user.id
                    });
                }

                if (user.role && user.role === 'recruiter') {
                    this.recruiters.push(user);
                }
            });
        });

        this.populateForms();
    }

    onChangeUser(event) {
        const user = this.users.filter((x) => x.id === event.value);
        this.jobOwner = `${user[0].first_name} ${user[0].last_name}`;
        this.hiringForm.patchValue({ default_email_name: this.jobOwner });
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
            location: [''],
            is_remote: [''],
            job_type: [''],
            number_of_hires: [''],
            education: [''],
            experience: [''],
            salary: [''],
            salary_from: [''],
            salary_to: [''],
            salary_period: [''],
            hide_salary: [''],
            description: [''],
            requirements: ['']
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
            default_email_name: this.jobOwner
        });

        this.editorAutofocusFix();
    }

    private populateForms() {
        // Forms
        this.jobDetailsForm = this.fb.group({
            title: [this.job.title, Validators.required],
            company: [this.job.company, Validators.required],
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
            description: [this.job.description],
            requirements: [this.job.requirements]
        });
        this.inputAddress = this.job.location;
        this.applicationsForm = this.fb.group({
            job_listing: ['default'],
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
            owner: [this.user ? this.user.id : ''],
            hiring_managers: [this.job.hiring_managers],
            recruiters: [this.job.recruiters],
            default_email_name: this.jobOwner
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
                this.router.navigateByUrl(`dashboard/jobs/${job.id}`);
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
        console.log({ ...this.job, ...form.value });

        this.jobService.saveJob({ ...this.job, ...form.value }, this.activeSection, true).subscribe((job: Job) => {
            console.log('RESPONSE FROM SAVE CALL:', job);
            this.contentLoading = false;
            if (job.created && job.id) {
                this.router.navigateByUrl(`dashboard/jobs/${job.id}?section=applications`);
            } else {
                this.goToNextSection();
            }
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

    private getActiveForm() {
        let form;
        switch (this.activeSection) {
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
            this.router.navigateByUrl(`dashboard/jobs`);
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
}
