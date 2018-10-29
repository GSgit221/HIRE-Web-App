import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAll() {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires`);
    }

    create(data: any) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires`, { data });
    }

    getById(id: string) {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}`);
    }

    deleteById(id: string) {
        return this.http.delete(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}`);
    }

    bulkDelete(ids: string[]) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/bulk-delete`, { items: ids });
    }

    getQuestions(id: string) {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}/questions`);
    }

    getQuestion(questionnaireId: string, questionId: string) {
        return this.http.get(
            `${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${questionnaireId}/questions/${questionId}`
            );
    }

    createQuestion(id: string, data: any) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}/questions`, { data });
    }

    updateQuestion(id: string, questionId: string, data: any) {
        return this.http.put(`${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}/questions/${questionId}`, { data });
    }

    questionsBulkDelete(id: string, ids: string[]) {
        return this.http.post(
            `${environment.api_url}/tenants/${this.authService.getTenantId()}/questionnaires/${id}/questions/bulk-delete`,
            { items: ids });
    }



}
