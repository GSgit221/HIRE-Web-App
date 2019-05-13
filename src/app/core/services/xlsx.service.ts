import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobCatalogue } from './../models/job_catalogue';

import { environment } from '@env/environment';
import { AuthService } from './../../modules/auth/auth.service';
import { UtilitiesService } from './utilities.service';
// import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class XLSXService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';

    constructor(private http: HttpClient, private authService: AuthService, private utilities: UtilitiesService) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
    }

    create(data): Observable<JobCatalogue> {
        console.log(data);
        return this.http
            .post<JobCatalogue>(
                `${environment.apiUrl}/job_catalogue/job_catalogues
`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
