import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }


    signInWithGoogle(token, user_data = {}) {
        return this.http.post(`${environment.api_url}/auth/oauth/google`, { token, user_data });
    }

    signin(email, password, remember) {
        return this.http.post(`${environment.api_url}/auth/signin`, { email, password, remember });
    }

    signup(name, email, password, agreed, user_data = {}) {
        return this.http.post(`${environment.api_url}/auth/signup`, { name, email, password, agreed, user_data});
    }

    resetPassword(email) {
        return this.http.post(`${environment.api_url}/auth/reset-password`, { email });
    }

    setPassword(password, password_reset_token) {
        return this.http.post(`${environment.api_url}/auth/set-password`, { password, password_reset_token });
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    getAuthorizationToken() {
        return localStorage.getItem('access_token');
    }


    getUserData() {
        return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${environment.geoip_key}`);
    }
}
