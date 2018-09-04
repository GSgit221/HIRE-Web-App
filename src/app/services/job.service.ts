import { Job } from './../models/job';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/tenants/${environment.tenant}/jobs`);
    }


    getJob(id) {
        if (id === 'new') {
            const newJob: Job = {
                title: '',
                company: '',
                location: '',
                is_remote: false,
                job_type: 'full-time',
                number_of_hires: 1,
                education: 'bachelors',
                experience: 'mid',
                salary_from: null,
                salary_to: null,
                salary_period: 'yearly',
                hide_salary: false,
                description: `<div><p>Description</p><p></p><p></p><p></p><p>Requirements</p></div>`,
                job_listing: 'default',
                resume_upload_required: true,
                email_missing_info: true,
                email_suggestions: true,
                application_field_name: 'required',
                application_field_email: 'required',
                application_field_phone: 'optional',
                application_field_current_location: 'optional',
                application_field_employment_equity_status: 'optional',
                application_field_gender: 'optional',
                application_field_experience_summary: 'required',
                application_field_work_history: 'required',
                application_field_education: 'required',
                application_field_cover_letter: 'optional',
                questionnaire: '',
                hiring_managers: [],
                team_members: [],
                default_email_name: '',
                status: 'BUILD',
                step_completed: 0
            };
            return of(newJob);
        } else {
            return this.http.get(`api/tenants/${environment.tenant}/jobs/${id}`);
        }
    }

    saveJob(job, activeSection, next) {
        if (job.id) {
            // Update
            return this.http.put(`api/tenants/${environment.tenant}/jobs/${job.id}`, {
                section: activeSection,
                data: job,
                next
            });
        } else {
            // Create
            return this.http.post(`api/tenants/${environment.tenant}/jobs`, {
                section: activeSection,
                data: job
            });
        }
    }
}
