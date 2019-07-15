import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@env/environment';
import { UtilitiesService } from './utilities.service';

@Injectable({
    providedIn: 'root'
})
export class SiteService {
    apiURL: string = environment.apiUrl;
    baseURL = '';
    defaultColor = '#ffffff';
    color: string;
    theme: any;
    private subject: BehaviorSubject<any>;
    constructor(private http: HttpClient, private utilities: UtilitiesService, private cookie: CookieService) {
        this.subject = new BehaviorSubject<any>({ color: this.defaultColor, logo_url: '' });
    }

    loadThemeFromAPI() {
        return this.http.get(`${this.apiURL}/tenants/${this.utilities.getTenant()}/settings/theme`);
    }

    loadThemeFromCookie() {
        return localStorage.getItem(`${this.utilities.getTenant()}_theme`);
    }

    loadTheme() {
        const themeFromCookie = this.loadThemeFromCookie();
        console.log(themeFromCookie);
        if (themeFromCookie) {
            this.theme = JSON.parse(themeFromCookie);
            this.loadThemeFromAPI().subscribe(
                (response: any) => {
                    console.log('set in cookies', JSON.stringify(response));
                    localStorage.setItem(`${this.utilities.getTenant()}_theme`, JSON.stringify(response));
                    return this.subject.next(response);
                },
                (errorResponse) => {
                    console.error(errorResponse);
                    return this.subject.next({ color: this.defaultColor, logo_url: '' });
                }
            );
            return this.subject.next(this.theme);
        } else {
            this.loadThemeFromAPI().subscribe(
                (response: any) => {
                    console.log('set in cookies', JSON.stringify(response));
                    localStorage.setItem(`${this.utilities.getTenant()}_theme`, JSON.stringify(response));
                    return this.subject.next(response);
                },
                (errorResponse) => {
                    console.error(errorResponse);
                    return this.subject.next({ color: this.defaultColor, logo_url: '' });
                }
            );
        }
    }

    getTheme(): Observable<{ color: string; logo_url: string }> {
        return this.subject.asObservable();
    }
}
