import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SelectItem } from 'primeng/api';

import { Job } from '../../models/job';
import { User } from '../../models/user';
import { FormHelperService } from '../../services/form-helper.service';
import { JobService } from '../../services/job.service';
import { ConditionalValidator } from '../../validators/conditional.validator';
import { Questionnaire } from './../../models/questionnaire';
import { QuestionnaireService } from './../../services/questionnaire.service';

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

    users: User[];

    jobTypeOptions: SelectItem[];
    educationOptions: SelectItem[];
    hiresOptions: SelectItem[];
    experienceOptions: SelectItem[];
    salaryOptions: SelectItem[];
    joblistingOptions: SelectItem[];
    questionnaireOptions: SelectItem[];
    applicationFieldsOptions: SelectItem[];
    hiringManagersOptions: SelectItem[];
    defaultNameOptions: SelectItem[];

    activeSection = 'job-details';
    // activeSection = 'hiring-team';
    sections = ['job-details', 'applications', 'hiring-team'];
    contentLoading = false;

    place: any;
    inputAddress: string;
    locationOptions: any;

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
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

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
            this.setDefaultNameOptions();
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
        // this.initForms();
        this.populateForms();
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
            hiring_managers: [''],
            team_members: [''],
            default_email_name: ['']
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
            hiring_managers: [this.job.hiring_managers],
            team_members: [this.job.team_members],
            default_email_name: [this.job.default_email_name]
        });
        this.editorAutofocusFix();

        // Location
        const locationControl = this.jobDetailsForm.get('location');
        this.jobDetailsForm.get('is_remote').valueChanges.subscribe((value) => {
            console.log(value);
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

    onNewUserAdded(user: User) {
        console.log('💁🏼‍♀️ New user added', user);
        this.users = this.users.slice(0);
        this.users.push(user);
        console.log('👫 USERS ARRAY:', this.users);
        this.setDefaultNameOptions();
    }

    private setDefaultNameOptions() {
        this.defaultNameOptions = [];
        if (this.job.hiring_managers) {
            this.job.hiring_managers.forEach((hm) => {
                const user = this.users.find((u) => u.user_id === hm);
                if (user) {
                    this.defaultNameOptions.push({
                        value: user.first_name + ' ' + user.last_name,
                        label: user.first_name + ' ' + user.last_name
                    });
                }
            });
        }
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
