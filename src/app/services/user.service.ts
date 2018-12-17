import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './../models/user';

import { environment } from '../../environments/environment';
import { AuthService } from './../modules/auth/auth.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    constructor(private http: HttpClient, private authService: AuthService, private utilities: UtilitiesService) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
    }
    getUser(): Observable<User> {
        return this.http
            .get<User>(`${environment.apiUrl}/me`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    create(data) {
        return this.http.post(`${this.baseURL}/users`, { data });
    }

    resendInvitation(userId: string) {
        return this.http.post(`${this.baseURL}/users/resend-invitation`, { user_id: userId });
    }

    getUsers() {
        return this.http.get(`${this.baseURL}/users`);
    }

    takeover(email) {
        return this.http.post(`${this.baseURL}/users/takeover`, { email });
    }

    bulkDeleteUsers(ids) {
        return this.http.post(`${this.baseURL}/users/bulk-delete`, { items: ids });
    }
}
