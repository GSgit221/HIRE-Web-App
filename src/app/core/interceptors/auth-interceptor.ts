import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

    handleError(err) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.authService.logout();
                if (this.router.url !== '/atuh/signin') {
                    this.router.navigateByUrl('/auth/signin');
                }
            }
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getAuthorizationToken();
        const whiteList = ['accounts.google.com', 'ipgeolocation'];
        if (whiteList.some((item) => req.url.indexOf(item) !== -1)) {
            return next.handle(req);
        }
        const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => this.handleError(err)));
    }
}
