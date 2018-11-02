import { AuthService } from './../auth/auth.service';
import { Job } from './../models/job';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAll() {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs`);
    }


    getJob(id) {
        if (id === 'new') {
            const newJob: Job = {
                title: '',
                company: '',
                location: '',
                is_remote: false,
                job_type: '',
                number_of_hires: '',
                education: '',
                experience: '',
                single_salary: false,
                salary_from: null,
                salary_to: null,
                salary_period: 'yearly',
                hide_salary: false,
                description: '',
                requirements: '',
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
            return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${id}`);
        }
    }

    saveJob(job, activeSection, next) {
        if (job.id) {
            // Update
            return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${job.id}`, {
                section: activeSection,
                data: job,
                next
            });
        } else {
            // Create
            return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs`, {
                section: activeSection,
                data: job
            });
        }
    }

    updateJob(id, data) {
        return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${id}`, {
            section: '',
            data: data,
            next: false
        });
    }

    deleteJob(id) {
        return this.http.delete(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${id}`);
    }

    bulkDeleteJobs(ids) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/bulk-delete`, {items: ids});
    }

    getUsers() {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/users`);
    }
    getAllCandidates() {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/candidates`);
    }

    getStages(jobId: string) {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/stages`);
    }

    getStage(jobId: string, stageId: string) {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/stages/${stageId}`);
    }

    createStage(jobId: string, data: {title: string}) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/stages`, {data});
    }

    updateStage(jobId: string, stageId: string, data: object) {
        return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/stages/${stageId}`, { data });
    }

    getCandidates(jobId: string) {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates`);
    }

    getCandidate(jobId: string, candidateId) {
        if (jobId === 'new') {
            return of({title: ''});
        } else {
            return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/${candidateId}`);
        }
    }

    createCandidate(jobId: string, formData: object) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates`, formData);
    }

    createCandidateFromEmail(jobId: string, email: string) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/email`, {email});
    }

    createCandidateFromCv(jobId: string, formData: object) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/cv`, formData);
    }

    updateCandidateWithCv(jobId: string, candidateId: string, formData: object) {
        return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/${candidateId}/cv`, formData);
    }

    deleteCandidate(jobId: string, candidateId: string) {
        return this.http.delete(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/${candidateId}`);
    }

    sendEmailsToCandidates(jobId: string, emails: string[]) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/send-emails`, { emails });
    }

    createJobFromCv(formData: object) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/spec`, formData);
    }

    updateCandidateStage(jobId: string, candidateId: string, stage: any) {
        return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/jobs/${jobId}/candidates/${candidateId}`, {data: {stage}});
    }
}
