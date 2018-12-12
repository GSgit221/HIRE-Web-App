import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './../modules/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
