import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './../../modules/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    signinURL = '/auth/signin';
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        if (state.url.indexOf('/recruiters/') !== -1) {
            this.signinURL = '/recruiters/auth/signin';
        }
        const returnUrl = state.url;
        const queryParams: any = {};
        if (returnUrl.length > 1) {
            queryParams.returnUrl = returnUrl;
        }
        this.router.navigate([this.signinURL], queryParams);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        if (state.url.indexOf('/recruiters/') !== -1) {
            this.signinURL = '/recruiters/auth/signin';
        }
        const returnUrl = state.url;
        const queryParams: any = {};
        if (returnUrl.length > 1) {
            queryParams.returnUrl = returnUrl;
        }
        this.router.navigate([this.signinURL], queryParams);
        return false;
    }
}
