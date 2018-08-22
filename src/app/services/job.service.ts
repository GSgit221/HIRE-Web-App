import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) { }


    getJob(id) {
        if (id === 'new') {
            const newJob = {
                title: '',
                company: '',
                location: '',
                is_remote: false,
                job_type: 'full-time',
                number_of_hires: 1,
                education: 'bachelors',
                experience: 'mid',
                salary_from: '',
                salary_to: '',
                salary_period: 'yearly',
                hide_salary: false,
                description: `<div><p>Description</p><p></p></div>`,
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
                default_email_name: ''
            };

            return of(newJob);
        } else {
            return this.http.get(`${environment.api_url}/jobs/${id}`);
        }
    }
}
