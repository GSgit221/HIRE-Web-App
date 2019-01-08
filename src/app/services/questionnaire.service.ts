import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {
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

    getAll() {
        return this.http.get(`${this.baseURL}/questionnaires`);
    }

    create(data: any) {
        return this.http.post(`${this.baseURL}/questionnaires`, { data });
    }

    getById(id: string) {
        return this.http.get(`${this.baseURL}/questionnaires/${id}`);
    }

    deleteById(id: string) {
        return this.http.delete(`${this.baseURL}/questionnaires/${id}`);
    }

    bulkDelete(ids: string[]) {
        return this.http.post(`${this.baseURL}/questionnaires/bulk-delete`, { items: ids });
    }

    getQuestions(id: string) {
        return this.http.get(`${this.baseURL}/questionnaires/${id}/questions`);
    }

    getQuestion(questionnaireId: string, questionId: string) {
        return this.http.get(`${this.baseURL}/questionnaires/${questionnaireId}/questions/${questionId}`);
    }

    createQuestion(id: string, data: any) {
        return this.http.post(`${this.baseURL}/questionnaires/${id}/questions`, { data });
    }

    updateQuestion(id: string, questionId: string, data: any) {
        return this.http.put(`${this.baseURL}/questionnaires/${id}/questions/${questionId}`, { data });
    }

    questionsBulkDelete(id: string, ids: string[]) {
        return this.http.post(`${this.baseURL}/questionnaires/${id}/questions/bulk-delete`, { items: ids });
    }
}
