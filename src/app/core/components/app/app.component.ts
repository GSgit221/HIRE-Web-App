import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Intercom } from 'ng-intercom';
import { filter, take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

import { AuthService } from './../../../modules/auth/auth.service';
import * as fromStore from './../../../store';
import * as fromSelectors from './../../../store/selectors';
import { User } from './../../models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    contentLoading = false;
    redirectURL = '/unsupported-browser';

    constructor(
        private authService: AuthService,
        private store: Store<fromStore.State>,
        private router: Router,
        public intercom: Intercom
    ) {
        if (this.detectIE()) {
            this.router.navigate([this.redirectURL]);
        } else {
            if (authService.isLoggedIn()) {
                this.contentLoading = true;
                this.store.dispatch(new fromStore.LoadUser());
                this.store
                    .pipe(
                        select(fromSelectors.getUserEntity),
                        filter((user) => !!user)
                    )
                    .subscribe(
                        (user: User) => {
                            this.contentLoading = false;
                            if (user && user.role === 'recruiter' && !user.activated) {
                                this.router.navigateByUrl('/recruiters/onboarding');
                            }
                            console.log('INITIALIZING INTERCOM FOR AUTHENTICATED USER');
                            this.intercom.boot({
                                app_id: environment.intercomAppId,
                                email: user.email,
                                user_hash: user.user_hash,
                                widget: {
                                    activator: '#intercom'
                                }
                            });
                        },
                        (errorResponse) => {
                            console.error(errorResponse);
                            this.contentLoading = false;
                        }
                    );
            } else {
                console.log('INITIALIZING INTERCOM FOR GUEST');
                this.intercom.boot({
                    app_id: environment.intercomAppId,
                    widget: {
                        activator: '#intercom'
                    }
                });
            }

            this.authService.$unauthorized.subscribe((value) => {
                if (value) {
                    console.log('UNAUTHORIZED');
                    this.contentLoading = false;
                }
            });
        }
    }

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
}
