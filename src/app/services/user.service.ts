import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AuthService } from './../auth/auth.service';
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
    create(data) {
        return this.http.post(`${this.baseURL}/users`, { data });
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
