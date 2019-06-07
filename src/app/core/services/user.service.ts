import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './../models/user';

import { environment } from '@env/environment';
import { AuthService } from './../../modules/auth/auth.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';

    constructor(private http: HttpClient, private authService: AuthService, private utilities: UtilitiesService) {}

    getUser(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/me`).pipe(catchError((error: any) => throwError(error)));
    }

    create(data): Observable<User> {
        return this.http
            .post<User>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users`, { data })
            .pipe(catchError((error: any) => throwError(error)));
    }

    resendInvitation(userId: string) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users/resend-invitation`, {
            user_id: userId
        });
    }

    getUsers(): Observable<User[]> {
        return this.http
            .get<User[]>(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    takeover(email) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users/takeover`, { email });
    }

    bulkDeleteUsers(ids) {
        return this.http.post(`${this.apiURL}/tenants/${this.utilities.getTenant()}/users/bulk-delete`, { items: ids });
    }
}
