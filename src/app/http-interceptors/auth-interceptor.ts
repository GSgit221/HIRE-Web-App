
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    handleError(err) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.authService.logout();
                if (this.router.url !== '/signin') {
                    this.router.navigateByUrl('/signin');
                }
            }
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getAuthorizationToken();
        const whiteList = ['accounts.google.com', 'nekudo'];
        if (whiteList.some(item => req.url.indexOf(item) !== -1)) {
            return next.handle(req);
        }
        const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
        return next.handle(authReq).pipe(
            tap((event: HttpEvent<any>) => { }, (err: any) => this.handleError(err))
        );
    }
}
