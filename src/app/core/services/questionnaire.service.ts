import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Questionnaire } from './../models/questionnaire';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.baseURL = `${this.apiURL}/tenants/${this.utilities.getTenant()}`;
    }

    getAll() {
        return this.http
            .get<Questionnaire[]>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    create(data: any) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires`, { data });
    }

    getById(id: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}`);
    }

    deleteById(id: string) {
        return this.http.delete(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}`);
    }

    bulkDelete(ids: string[]) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/bulk-delete`, {
            items: ids
        });
    }

    getQuestions(id: string) {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}/questions`);
    }

    getQuestion(questionnaireId: string, questionId: string) {
        return this.http.get(
            `${
                this.apiURL
            }/tenants/${this.utilities.getTenant()}/questionnaires/${questionnaireId}/questions/${questionId}`
        );
    }

    createQuestion(id: string, data: any) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}/questions`, {
            data
        });
    }

    updateQuestion(id: string, questionId: string, data: any) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}/questions/${questionId}`,
            { data }
        );
    }

    questionsBulkDelete(id: string, ids: string[]) {
        return this.http.post(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${id}/questions/bulk-delete`,
            { items: ids }
        );
    }

    updateQuestionsOrder(questionnaireId: string, data) {
        return this.http.put(
            `${this.apiURL}/tenants/${this.utilities.getTenant()}/questionnaires/${questionnaireId}/questions`,
            { data }
        );
    }
}
