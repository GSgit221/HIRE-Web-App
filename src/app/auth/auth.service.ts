import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    defaultTenantId = 'dimensiondata';
    constructor(private http: HttpClient) { }


    signInWithGoogle(token, user_data = {}) {
        return this.http.post(`${environment.api_url}/auth/oauth/google`, { token, user_data, source: 'jobs-portal' });
    }

    signin(email, password, remember) {
        return this.http.post(`${environment.api_url}/auth/signin`, { email, password, remember, source: 'jobs-portal' });
    }

    signup(name, email, password, agreed, user_data = {}) {
        return this.http.post(`${environment.api_url}/auth/signup`, { name, email, password, agreed, user_data, source: 'jobs-portal'});
    }

    resetPassword(email) {
        return this.http.post(`${environment.api_url}/auth/reset-password`, { email, source: 'jobs-portal' });
    }

    setPassword(password, password_reset_token) {
        return this.http.post(`${environment.api_url}/auth/set-password`, { password, password_reset_token, source: 'jobs-portal' });
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('tenant_id', authResult.tenant_id || this.defaultTenantId);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('tenant_id');
    }

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    getAuthorizationToken() {
        return localStorage.getItem('access_token');
    }

    getTenantId() {
        return localStorage.getItem('tenant_id') || this.defaultTenantId;
    }

    getUserData() {
        return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${environment.geoip_key}`);
    }
}
