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
    tenantId = 'undefined';
    baseURL = '';
    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
    }

    getAll() {
        return this.http.get(`${this.baseURL}/jobs`);
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
            return this.http.get(`${this.baseURL}/jobs/${id}`);
        }
    }

    saveJob(job, activeSection, next) {
        if (job.id) {
            // Update
            return this.http.put(`${this.baseURL}/jobs/${job.id}`, {
                section: activeSection,
                data: job,
                next
            });
        } else {
            // Create
            return this.http.post(`${this.baseURL}/jobs`, {
                section: activeSection,
                data: job
            });
        }
    }

    updateJob(id, data) {
        return this.http.put(`${this.baseURL}/jobs/${id}`, {
            section: '',
            data,
            next: false
        });
    }

    deleteJob(id) {
        return this.http.delete(`${this.baseURL}/jobs/${id}`);
    }

    bulkDeleteJobs(ids) {
        return this.http.post(`${this.baseURL}/jobs/bulk-delete`, { items: ids });
    }

    getUsers() {
        return this.http.get(`${this.baseURL}/users`);
    }

    getAllCandidates() {
        return this.http.get(`${this.apiURL}/tenants/${this.tenantId}/candidates`);
    }

    getCandidatesChunk(startAt, limit, sortBy = 'first_name') {
        return this.http.get(
            `${this.apiURL}/tenants/${
                this.tenantId
            }/candidates-chunk?sortBy=${sortBy}&startAt=${startAt}&limit=${limit}`
        );
    }

    getCandidatesAmount() {
        return this.http.get(`${this.apiURL}/tenants/${this.tenantId}/candidates-amount`);
    }

    getDataCompany(url) {
        return this.http.post(`${this.apiURL}/company`, { url });
    }

    getStages(jobId: string) {
        return this.http.get(`${this.baseURL}/jobs/${jobId}/stages`);
    }

    getStage(jobId: string, stageId: string) {
        return this.http.get(`${this.baseURL}/jobs/${jobId}/stages/${stageId}`);
    }

    createStage(jobId: string, data: { title: string }) {
        return this.http.post(`${this.baseURL}/jobs/${jobId}/stages`, { data });
    }

    updateStage(jobId: string, stageId: string, data: object) {
        return this.http.put(`${this.baseURL}/jobs/${jobId}/stages/${stageId}`, { data });
    }

    removeStage(jobId: string, stageId: string) {
        return this.http.delete(`${this.baseURL}/jobs/${jobId}/stages/${stageId}`);
    }

    updateStages(jobId: string, data) {
        return this.http.put(`${this.baseURL}/jobs/${jobId}/stages/`, { data });
    }

    getCandidates(jobId: string) {
        return this.http.get(`${this.baseURL}/jobs/${jobId}/candidates`);
    }

    getCandidate(jobId: string, candidateId): Observable<any> {
        if (jobId === 'new') {
            return of({ title: '' });
        } else {
            return this.http.get<any>(`${this.baseURL}/jobs/${jobId}/candidates/${candidateId}`);
        }
    }

    createCandidate(jobId: string, formData: object) {
        return this.http.post(`${this.baseURL}/jobs/${jobId}/candidates`, formData);
    }

    createCandidateFromEmail(jobId: string, email: string) {
        return this.http.post(`${this.baseURL}/jobs/${jobId}/candidates/email`, { email });
    }

    createCandidateFromCv(jobId: string, formData: object) {
        return this.http.post(`${this.baseURL}/jobs/${jobId}/candidates/cv`, formData);
    }

    updateCandidateWithCv(jobId: string, candidateId: string, formData: object) {
        return this.http.put(`${this.baseURL}/jobs/${jobId}/candidates/${candidateId}/cv`, formData);
    }

    deleteCandidate(jobId: string, candidateId: string) {
        return this.http.delete(`${this.baseURL}/jobs/${jobId}/candidates/${candidateId}`);
    }

    sendEmailsToCandidates(jobId: string, emails: string[]) {
        return this.http.post(`${this.baseURL}/jobs/${jobId}/candidates/send-emails`, { emails });
    }

    createJobFromCv(formData: object) {
        return this.http.post(`${this.baseURL}/jobs/spec`, formData);
    }

    updateCandidateStage(jobId: string, candidateId: string, stage: any) {
        return this.http.put(`${this.baseURL}/jobs/${jobId}/candidates/${candidateId}/stage`, { data: { stage } });
    }

    evaluateCandidateVideoAnswer(jobId: string, candidateId: string, stageId: string, data: any) {
        return this.http.put(
            `${this.baseURL}/jobs/${jobId}/candidates/${candidateId}/stages/${stageId}/evaluate-video`,
            data
        );
    }
}
