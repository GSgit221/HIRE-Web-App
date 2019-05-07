import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}/settings/theme`;
    }

    getTheme() {
        return this.http.get(`${this.baseURL}`).pipe(catchError((error: any) => throwError(error)));
    }

    saveTheme(data: any) {
        return this.http.put(`${this.baseURL}`, data).pipe(catchError((error: any) => throwError(error)));
    }

    uploadLogo(data: any) {
        return this.http.post(`${this.baseURL}/logo`, data).pipe(catchError((error: any) => throwError(error)));
    }
}
