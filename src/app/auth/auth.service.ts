import { CookieService } from 'ngx-cookie-service';
import { UtilitiesService } from './../services/utilities.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    defaultTenantId = 'hellocrowd';
    constructor(
        private http: HttpClient,
        private utilities: UtilitiesService,
        private cookie: CookieService
    ) { }

    getGoogleSigninLink() {
        const base = 'https://accounts.google.com/o/oauth2/auth';
        const clientId = environment.googleClientId;
        const scope = 'openid+profile+email';
        const responseType = 'id_token+token';
        const redirectUri = this.utilities.isLocalDevelopment()
            ? encodeURI(environment.googleSigninRedirectUri)
            : encodeURI(environment.appUrl.replace('subdomain', 'dev'));
        const accessType = 'online';
        const nonce = 'hire-by-hellocrowd-' + this.utilities.generateUID(5);
        const state = this.utilities.getTenant();
        return `${base}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&access_type=${accessType}&nonce=${nonce}&state=${state}`;
    }


    signInWithGoogle(token, user_data = {}, tenant) {
        return this.http.post(`${environment.apiUrl}/auth/oauth/google`, { token, user_data, source: 'jobs', tenant });
    }

    signin(email, password, remember) {
        return this.http.post(`${environment.apiUrl}/auth/signin`, { email, password, remember, source: 'jobs', tenant: this.utilities.getTenant() });
    }

    signup(name, email, password, agreed, user_data = {}) {
        return this.http.post(`${environment.apiUrl}/auth/signup`, { name, email, password, agreed, user_data, source: 'jobs', tenant: this.utilities.getTenant() });
    }

    resetPassword(email) {
        return this.http.post(`${environment.apiUrl}/auth/reset-password`, { email, source: 'jobs', tenant: this.utilities.getTenant() });
    }

    setPassword(password, password_reset_token) {
        return this.http.post(`${environment.apiUrl}/auth/set-password`, { password, password_reset_token, source: 'jobs', tenant: this.utilities.getTenant() });
    }

    setSession(authResult, tenant = null) {
        if (!tenant) {
            tenant = this.utilities.getTenant();
        }
        this.cookie.set(`${tenant}_access_token`, authResult.access_token, 12, '/', environment.cookieDomain);
    }

    logout() {
        const tenant = this.utilities.getTenant();
        this.cookie.delete(`${tenant}_access_token`, '/', environment.cookieDomain);
    }

    isLoggedIn() {
        const tenant = this.utilities.getTenant();
        return this.cookie.get(`${tenant}_access_token`) ? true : false;
    }

    getAuthorizationToken() {
        const tenant = this.utilities.getTenant();
        return this.cookie.get(`${tenant}_access_token`);
    }

    getUserData() {
        return new Promise((resolve, reject) => {
            this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${environment.geoipKey}`)
                .subscribe(userData => resolve(userData), error => {
                    console.error(error);
                    return resolve(null);
                });
        });
    }
}
