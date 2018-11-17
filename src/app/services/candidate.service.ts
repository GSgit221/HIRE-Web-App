import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    constructor(
        private http: HttpClient,
        private utilities: UtilitiesService
    ) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
    }


    updateFeedbackPositionRatingCategories(jobId: string, data: any[]) {
        return this.http.put(`${this.apiURL}/tenants/${this.tenantId}/jobs/${jobId}/position-rating-categories`, { data });
    }


    updateFeedback(jobId: string, candidateId: string, data: any) {
        return this.http.put(`${this.apiURL}/tenants/${this.tenantId}/jobs/${jobId}/candidates/${candidateId}/feedback`, { data });
    }
}
