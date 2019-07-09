import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { EmailTemplate } from './../models/email-template';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseUrl = '';
    newItem = {
        title: '',
        subject: '',
        from: 'owner',
        delayed: 'none',
        content: `
        <p>Content</p>
        `,
        mandatory: false,
        last_send: null
    };

    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.baseUrl = `${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates`;
    }

    findAll() {
        return this.http
            .get<EmailTemplate[]>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates`)
            .pipe(
                map((emailTemplates: EmailTemplate[]) => emailTemplates.sort((a, b) => a.created_at - b.created_at)),
                catchError((error: any) => throwError(error))
            );
    }

    create(data: any) {
        return this.http
            .post<EmailTemplate>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates`, {
                data
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    find(id: string): Observable<any> {
        if (id === 'new') {
            return of(this.newItem);
        } else {
            return this.http
                .get<EmailTemplate>(
                    `${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates/${id}`
                )
                .pipe(catchError((error: any) => throwError(error)));
        }
    }

    update(id: string, data: any) {
        return this.http
            .put<EmailTemplate>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates/${id}`, {
                data
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    delete(id: string) {
        return this.http
            .delete(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates/${id}`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    bulkDelete(ids: string[]) {
        return this.http
            .post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/email-templates/bulk-delete`, {
                items: ids
            })
            .pipe(catchError((error: any) => throwError(error)));
    }
}
