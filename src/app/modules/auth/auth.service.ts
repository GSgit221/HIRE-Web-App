import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@env/environment';
import { UtilitiesService } from './../../core/services/utilities.service';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    defaultTenantId = 'hellocrowd';

    dataSource: any = {
        loading: false
    };

    _loading: Subject<boolean>;
    _unauthorized: Subject<boolean>;

    constructor(
        private http: HttpClient,
        private utilities: UtilitiesService,
        private cookie: CookieService,
        private socialAuthService: SocialAuthService
    ) {
        this._loading = new Subject();
        this._unauthorized = new Subject();
    }

    public get $loading(): Observable<boolean> {
        return this._loading.asObservable();
    }
    public get loading(): boolean {
        return this.dataSource.loading;
    }
    public set loading(value: boolean) {
        this.dataSource.loading = value;
        this._loading.next(value);
    }

    public get $unauthorized(): Observable<boolean> {
        return this._unauthorized.asObservable();
    }
    public set unauthorized(value: boolean) {
        this._unauthorized.next(value);
    }

    onGoogleSignin() {
        return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithGoogle(authData) {
        return this.http.post(`${environment.apiUrl}/auth/oauth/google`, authData);
    }

    signUpWithGoogle(data) {
        return this.http.post(`${environment.apiUrl}/auth/oauth/signup-google`, {
            ...data,
            source: 'jobs'
        });
    }

    signin(email, password) {
        return this.http.post(`${environment.apiUrl}/auth/signin`, {
            email,
            password,
            source: 'jobs'
        });
    }

    signup(data) {
        return this.http.post(`${environment.apiUrl}/auth/signup`, {
            ...data,
            source: 'jobs'
        });
    }

    userSignup(email) {
        return this.http.post(`${environment.apiUrl}/auth/send-email`, {
            email,
            source: 'jobs'
        });
    }

    verifyOtp(email, otp) {
        return this.http.post(`${environment.apiUrl}/auth/user-signup-verify-otp`, {
            email,
            otp,
            source: 'jobs'
        });
    }

    resetPassword(email) {
        return this.http.post(`${environment.apiUrl}/auth/reset-password`, {
            email,
            source: 'jobs'
        });
    }

    setPassword(password, password_reset_token, invitation_code) {
        return this.http.post(`${environment.apiUrl}/auth/set-password`, {
            password,
            password_reset_token,
            invitation_code,
            source: 'jobs'
        });
    }

    checkUserExists(email) {
        return this.http.post(`${environment.apiUrl}/auth/check-user`, { email });
    }

    setSession(authResult) {
        this.cookie.set('access_token', authResult.access_token, 12, '/');
    }

    logout() {
        this.socialAuthService.signOut();
        this.cookie.delete('access_token', '/');
    }

    isLoggedIn() {
        return this.cookie.get('access_token') ? true : false;
    }

    getAuthorizationToken() {
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

    ssoSignIn(company) {
        return this.http.post(`${environment.apiUrl}/login`, {
            company
        });
    }
}
