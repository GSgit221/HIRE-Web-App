import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { User } from './../../core/models/user';
import * as fromStore from './../../store';
import * as fromUserActions from './../../store/actions/user.action';
import * as fromUsersActions from './../../store/actions/users.action';
import * as fromSelectors from './../../store/selectors';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-signout',
    template: '<iframe *ngIf="link" style="width: 100%; height: 100%;" [src]="link">{{ link }}</iframe>',
    styles: []
})
export class SignoutComponent implements OnInit {
    link;
    constructor(
        private authService: AuthService,
        private router: Router,
        private dom: DomSanitizer,
        private store: Store<fromStore.State>
    ) {}

    ngOnInit() {
        this.store
            .pipe(
                select(fromSelectors.getUserEntity),
                take(1)
            )
            .subscribe((user: User) => {
                console.log('GOT USER', user);
                if (user && user.name_id && user.session_index) {
                    console.log('Need to logout from provider');
                    this.authService
                        .ssoSignOut({ name_id: user.name_id, session_index: user.session_index })
                        .subscribe((response: any) => {
                            console.log(response);
                            this.link = this.dom.bypassSecurityTrustResourceUrl(response.logout_url);
                        });
                    setTimeout(() => {
                        this.authService.logout();
                        this.store.dispatch(new fromUserActions.ClearUser());
                        this.router.navigateByUrl('/auth/signin');
                    }, 1000);
                } else {
                    this.authService.logout();
                    this.store.dispatch(new fromUserActions.ClearUser());
                    this.router.navigateByUrl('/auth/signin');
                }
            });
    }
}
