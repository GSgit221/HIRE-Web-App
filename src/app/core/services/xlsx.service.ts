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
    baseURL = '';

    constructor(private http: HttpClient, private authService: AuthService, private utilities: UtilitiesService) {}

    create(data: any) {
        return this.http.post(`${environment.apiUrl}/job_catalogue`, data);
    }

    getJobCatalogues() {
        return this.http
            .get<JobCatalogue[]>(`${environment.apiUrl}/job_descriptions`)
            .pipe(catchError((error: any) => throwError(error)));
    }
}
