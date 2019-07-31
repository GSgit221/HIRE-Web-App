import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BrowserGuard implements CanActivate, CanActivateChild {
    redirectURL = '/unsupported-browser';
    constructor(private router: Router) {}

    detectIE() {
        const ua = window.navigator.userAgent;

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        // other browser
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const returnUrl = state.url;
        const queryParams: any = {};
        if (returnUrl.length > 1) {
            queryParams.returnUrl = returnUrl;
        }
        if (this.detectIE()) {
            this.router.navigate([this.redirectURL], queryParams);
            return false;
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const returnUrl = state.url;
        const queryParams: any = {};
        if (returnUrl.length > 1) {
            queryParams.returnUrl = returnUrl;
        }
        if (this.detectIE()) {
            this.router.navigate([this.redirectURL], queryParams);
            return false;
        }
        return true;
    }
}
