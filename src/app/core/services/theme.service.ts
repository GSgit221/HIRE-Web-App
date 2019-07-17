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
    baseURL = '';
    constructor(private http: HttpClient, private utilities: UtilitiesService) {}

    getTheme() {
        return this.http
            .get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/theme`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    saveTheme(data: any) {
        return this.http
            .put(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/theme`, data)
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadLogo(data: any) {
        return this.http
            .post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/theme/logo`, data)
            .pipe(catchError((error: any) => throwError(error)));
    }
}
