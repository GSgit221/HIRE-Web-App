import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    private searchInputSubject = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.baseURL = `${this.apiURL}/tenants/${this.utilities.getTenant()}`;
    }

    updateFeedbackPositionRatingCategories(jobId: string, data: any[]) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/position-rating-categories`,
            {
                data
            }
        );
    }

    updateFeedback(jobId: string, candidateId: string, data: any) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/feedback`,
            { data }
        );
    }

    extendAssessmentDeadline(jobId: string, candidateId: string, data: any) {
        return this.http.put(
            `${
                this.apiURL
            }/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/assessment-deadline`,
            { data }
        );
    }

    saveFeed(jobId: string, candidateId: string, data: any) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/feed`,
            {
                data
            }
        );
    }

    getResumeLink(resumeFile: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/resume-link?file=${resumeFile}`);
    }

    addToAudit(jobId, candidateId, data) {
        return this.http.post(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/jobs/${jobId}/candidates/${candidateId}/audit`,
            {
                data
            }
        );
    }

    bulkDelete(ids: string[]) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/candidates/bulk-delete`, {
            items: ids
        });
    }

    setSearchValueForCandidates(val) {
        this.searchInputSubject.next(val);
    }

    getSearchValueForCandidates(): Observable<any> {
        return this.searchInputSubject.asObservable();
    }
}
