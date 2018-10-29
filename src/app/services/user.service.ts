import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) { }
    create(data) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/users`, {data});
    }

    getUsers() {
        return this.http.get(`${environment.api_url}/tenants/${this.authService.getTenantId()}/users`);
    }

    takeover(email) {
        return this.http.post(`${environment.api_url}/tenants/${this.authService.getTenantId()}/users/takeover`, {email});
    }
}
