import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

import { Job } from './../../models/job';
import { JobService } from './../../services/job.service';


@Component({
    selector: 'app-job-item',
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
    jobDetailsForm: FormGroup;
    applicationsForm: FormGroup;
    hiringForm: FormGroup;

    job: Job;
    titleMaxLength: number;

    jobTypeOptions: SelectItem[];
    educationOptions: SelectItem[];
    hiresOptions: SelectItem[];
    experienceOptions: SelectItem[];
    salaryOptions: SelectItem[];
    joblistingOptions: SelectItem[];
    questionnaireOptions: SelectItem[];
    applicationFieldsOptions: SelectItem[];
    hiringManagersOptions: SelectItem[];
    jobDescription: string;

    activeSection = 'job-details';
    sections = ['job-details', 'applications', 'hiring-team'];
    contentLoading = true;


    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
        private fb: FormBuilder,
        private router: Router
    ) {

        this.titleMaxLength = 250;

        this.initForms();

        // Job
        let jobId = this.route.snapshot.paramMap.get('id');
        this.jobService.getJob(jobId)
            .subscribe((job: Job) => {
                this.job = job;
                this.populateForms();
                console.log('FROM ROUTE-------------------- JOB:', jobId, this.job);
                this.contentLoading = false;
            });


        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('id') !== jobId) {
                this.contentLoading = true;
                jobId = params.get('id');
                this.jobService.getJob(jobId)
                    .subscribe((job: Job) => {
                        this.job = job;
                        this.populateForms();
                        console.log('FROM CHANGE-------------------- JOB:', jobId, this.job);

                        const section = this.route.snapshot.queryParamMap.get('section');
                        console.log(section);
                        if (section) {
                            this.activeSection = section;
                        }


                        this.contentLoading = false;
                    });
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

        this.salaryOptions = [
            { label: 'per year', value: 'yearly' },
            { label: 'per month', value: 'monthly' }
        ];

        this.joblistingOptions = [
            { label: 'Default', value: 'default' }
        ];

        this.questionnaireOptions = [];

        this.applicationFieldsOptions = [
            { label: 'Required', value: 'required' },
            { label: 'Optional', value: 'optional' },
            { label: 'Disabled', value: 'disabled' }
        ];

        this.hiringManagersOptions = [];
    }

    ngOnInit() {
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
            salary_from: [''],
            salary_to: [''],
            salary_period: [''],
            hide_salary: [''],
            description: ['']

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
    }

    private populateForms() {
        // Forms
        this.jobDetailsForm = this.fb.group({
            title: [this.job.title, Validators.required],
            company: [this.job.company, Validators.required],
            location: [{ value: this.job.location, disabled: false }],
            is_remote: [this.job.is_remote || false],
            job_type: [this.job.job_type, Validators.required],
            number_of_hires: [this.job.number_of_hires, Validators.required],
            education: [this.job.education, Validators.required],
            experience: [this.job.experience, Validators.required],
            salary_from: [this.job.salary_from],
            salary_to: [this.job.salary_to],
            salary_period: [this.job.salary_period],
            hide_salary: [this.job.hide_salary || false],
            description: [this.job.description]

        });
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
            questionnaire: [{ value: this.job.questionnaire, disabled: true }]
        });
        this.hiringForm = this.fb.group({
            hiring_managers: [this.job.hiring_managers],
            team_members: [this.job.team_members],
            default_email_name: [this.job.default_email_name]
        });
    }


    onChangeSection(section: string) {
        this.activeSection = section;
    }

    onSaveDraft(event) {
        event.preventDefault();
        const form = this.getActiveForm();
        if (!form.valid) {
            this.markFormGroupTouched(form);
            console.log('FORM IS INVALID');
            console.log(form);
            return;
        }

        console.log('FORM IS VALID');
        console.log(Object.assign(this.job, form.value));

        this.jobService.saveJob(Object.assign(this.job, form.value), this.activeSection, false)
            .subscribe((job: Job) => {
                console.log('RESPONSE FROM SAVE CALL:');
                console.log(job);
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
            this.markFormGroupTouched(form);
            console.log('FORM IS INVALID');
            console.log(form);
            return;
        }
        // VALID
        console.log('FORM IS VALID');
        console.log(Object.assign(this.job, form.value));

        this.jobService.saveJob(Object.assign(this.job, form.value), this.activeSection, true)
            .subscribe((job: Job) => {
                console.log('RESPONSE FROM SAVE CALL:');
                console.log(job);
                this.contentLoading = false;
                if (job.created && job.id) {
                    this.router.navigateByUrl(`dashboard/jobs/${job.id}?section=applications`);
                } else {
                    this.activeSection = this.nextSection();
                }
            });
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

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    private nextSection() {
        const index = this.sections.indexOf(this.activeSection);
        const nextIndex = (index + 1 < this.sections.length) ? index + 1 : 0;
        return this.sections[nextIndex];
    }
}
