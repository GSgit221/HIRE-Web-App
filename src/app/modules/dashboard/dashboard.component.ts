import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { User } from './../../models/user';

import * as fromStore from '../../store';
import * as fromSelectors from './../../store/selectors';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: User;
    constructor(private store: Store<fromStore.State>, private router: Router) {
        this.store
            .pipe(
                select(fromSelectors.getUserEntity),
                filter((user) => !!user)
            )
            .subscribe((user: User) => {
                this.user = user;
                if (this.user && this.user.role === 'recruiter' && !this.user.activated) {
                    this.router.navigateByUrl('/recruiters/onboarding');
                }
            });
    }
    ngOnInit() {}
}
