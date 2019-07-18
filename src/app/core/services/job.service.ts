import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import { Candidate } from '../models/candidate';
import { Job } from './../models/job';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    apiURL: string = environment.apiUrl;
    baseURL = '';
    constructor(private http: HttpClient, private utilities: UtilitiesService) {}

    getAll() {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs`);
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
                job_role: '',
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
                recruiters: [],
                default_email_name: '',
                status: 'BUILD',
                step_completed: 0
            };

            return of(newJob);
        } else {
            return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${id}`);
        }
    }

    saveJob(job, activeSection, next) {
        if (job.id) {
            // Update
            return this.http.put(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${job.id}`, {
                section: activeSection,
                data: job,
                next
            });
        } else {
            // Create
            return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs`, {
                section: activeSection,
                data: job
            });
        }
    }

    updateJob(id, data) {
        return this.http.put(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${id}`, {
            section: '',
            data,
            next: false
        });
    }

    deleteJob(id) {
        return this.http.delete(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${id}`);
    }

    bulkDeleteJobs(ids) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/bulk-delete`, { items: ids });
    }

    getUsers() {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users`);
    }

    getAllCandidates() {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/candidates`);
    }

    getCandidatesChunk(startAt, limit, sortBy = 'first_name') {
        return this.http.get(
            `${
                this.apiURL
            }/tenants/${this.utilities.getTenant()}/candidates-chunk?sortBy=${sortBy}&startAt=${startAt}&limit=${limit}`
        );
    }

    getCandidatesAmount() {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/candidates-amount`);
    }

    getDataCompany(url) {
        return this.http.post(`${this.apiURL}/company`, { url });
    }

    getStages(jobId: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages`);
    }

    getStage(jobId: string, stageId: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages/${stageId}`);
    }

    createStage(jobId: string, data: { title: string }) {
        this.baseURL = `${this.apiURL}/tenants/${this.utilities.getTenant()}`;
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages`, { data });
    }

    updateStage(jobId: string, stageId: string, data: object) {
        return this.http.put(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages/${stageId}`, {
            data
        });
    }

    removeStage(jobId: string, stageId: string) {
        return this.http.delete(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages/${stageId}`);
    }

    updateStages(jobId: string, data) {
        return this.http.put(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/stages/`, { data });
    }

    getCandidates(jobId: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates`);
    }

    getCandidate(jobId: string, candidateId): Observable<any> {
        if (jobId === 'new') {
            return of({ title: '' });
        } else {
            return this.http.get<any>(
                `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}`
            );
        }
    }

    createCandidate(jobId: string, formData: object) {
        return this.http.post(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates`,
            formData
        );
    }

    createCandidateFromEmail(jobId: string, email: string) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/email`, {
            email
        });
    }

    createCandidateFromCv(jobId: string, formData: object) {
        return this.http.post(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/cv`,
            formData
        );
    }

    updateCandidateWithCv(jobId: string, candidateId: string, formData: object) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/cv`,
            formData
        );
    }

    deleteCandidate(jobId: string, candidateId: string, emailTemplateId?: string) {
        return this.http.delete(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}${
                emailTemplateId ? `?template=${emailTemplateId}` : ''
            }`
        );
    }

    setCandidatesEmailNotifications(jobId: string, emails: string[]) {
        return this.http.post(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/set-email-notifications`,
            {
                emails
            }
        );
    }

    createJobFromCv(formData: object) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/spec`, formData);
    }

    updateCandidateStage(jobId: string, candidateId: string, data: any) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/stage`,
            { data }
        );
    }

    readCandidate(jobId: string, candidateId: string, read: string[]) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}`,
            { data: { read } }
        );
    }

    evaluateCandidateVideoAnswer(jobId: string, candidateId: string, stageId: string, data: any) {
        return this.http.put(
            `${
                this.apiURL
            }/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/stages/${stageId}/evaluate-video`,
            data
        );
    }
}
