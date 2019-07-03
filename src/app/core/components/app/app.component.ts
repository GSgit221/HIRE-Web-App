import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

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
    constructor(private authService: AuthService, private store: Store<fromStore.State>, private router: Router) {
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
                    },
                    (errorResponse) => {
                        console.error(errorResponse);
                        this.contentLoading = false;
                    }
                );
        }
    }
}
