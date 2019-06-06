import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@env/environment';
import { UtilitiesService } from './../../core/services/utilities.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    defaultTenantId = 'hellocrowd';
    constructor(
        private http: HttpClient,
        private utilities: UtilitiesService,
        private cookie: CookieService,
        private socialAuthService: SocialAuthService
    ) {}

    onGoogleSignin() {
        return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    getGoogleSigninLink() {
        const base = 'https://accounts.google.com/o/oauth2/auth';
        const clientId = environment.googleClientId;
        const scope = 'openid+profile+email';
        const responseType = 'id_token+token';
        const redirectUri = this.utilities.isLocalDevelopment()
            ? encodeURI(environment.googleSigninRedirectUri)
            : encodeURI(environment.appUrl.replace('subdomain', 'oauth'));
        const accessType = 'online';
        const nonce = 'hire-by-hellocrowd-' + this.utilities.generateUID(5);
        const state = 'signin-' + this.utilities.getTenant();
        return `${base}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&access_type=${accessType}&nonce=${nonce}&state=${state}`;
    }

    getGoogleSignupLink() {
        const base = 'https://accounts.google.com/o/oauth2/auth';
        const clientId = environment.googleClientId;
        const scope = 'openid+profile+email';
        const responseType = 'id_token+token';
        const redirectUri = this.utilities.isLocalDevelopment()
            ? encodeURI(environment.googleSigninRedirectUri)
            : encodeURI(environment.appUrl.replace('subdomain', 'app'));
        const accessType = 'online';
        const nonce = 'hire-by-hellocrowd-' + this.utilities.generateUID(5);
        const state = 'signup-' + this.utilities.getTenant();
        return `${base}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&access_type=${accessType}&nonce=${nonce}&state=${state}`;
    }

    // signInWithGoogle(token, geo_data = {}, tenant) {
    //     return this.http.post(`${environment.apiUrl}/auth/oauth/google`, { token, geo_data, source: 'jobs', tenant });
    // }
    signInWithGoogle(authData) {
        return this.http.post(`${environment.apiUrl}/auth/oauth/google`, authData);
    }

    signUpWithGoogle(token, geo_data = {}, tenant) {
        return this.http.post(`${environment.apiUrl}/auth/signup-google`, { token, geo_data, source: 'jobs', tenant });
    }

    completeSignUpWithGoogle(token, data, tenant) {
        return this.http.post(`${environment.apiUrl}/auth/complete-signup-google`, {
            ...data,
            token,
            source: 'jobs',
            tenant
        });
    }

    signin(email, password) {
        return this.http.post(`${environment.apiUrl}/auth/signin`, {
            email,
            password,
            source: 'jobs',
            tenant: this.utilities.getTenant()
        });
    }

    signup(data) {
        return this.http.post(`${environment.apiUrl}/auth/signup`, {
            ...data,
            source: 'jobs',
            tenant: this.utilities.getTenant()
        });
    }

    resetPassword(email) {
        return this.http.post(`${environment.apiUrl}/auth/reset-password`, {
            email,
            source: 'jobs',
            tenant: this.utilities.getTenant()
        });
    }

    setPassword(password, password_reset_token, invitation_code) {
        return this.http.post(`${environment.apiUrl}/auth/set-password`, {
            password,
            password_reset_token,
            invitation_code,
            source: 'jobs',
            tenant: this.utilities.getTenant()
        });
    }

    checkUserExists(email) {
        return this.http.post(`${environment.apiUrl}/auth/check-user`, { email });
    }

    setSession(authResult) {
        // if (!tenant) {
        //     tenant = this.utilities.getTenant();
        // }
        // this.cookie.set(`${tenant}_access_token`, authResult.access_token, 12, '/', environment.cookieDomain);
        this.cookie.set('access_token', authResult.access_token, 12);
    }

    logout() {
        // const tenant = this.utilities.getTenant();
        // this.cookie.delete(`${tenant}_access_token`, '/', environment.cookieDomain);
        // this.cookie.delete(`${tenant}_access_token`, '/', environment.applyCookieDomain);
        this.cookie.delete('access_token');
    }

    isLoggedIn() {
        // const tenant = this.utilities.getTenant();
        // return this.cookie.get(`${tenant}_access_token`) ? true : false;
        return this.cookie.get('access_token') ? true : false;
    }

    getAuthorizationToken() {
        // const tenant = this.utilities.getTenant();
        // return this.cookie.get(`${tenant}_access_token`);
        return this.cookie.get(`access_token`);
    }

    getUserData() {
        return new Promise((resolve, reject) => {
            this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${environment.geoipKey}`).subscribe(
                (userData) => resolve(userData),
                (error) => {
                    console.error(error);
                    return resolve(null);
                }
            );
        });
    }
    getCompanyByEmail(email) {
        return this.http.post(`${environment.apiUrl}/email`, { email });
    }
}
