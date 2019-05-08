import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { UtilitiesService } from './../services/utilities.service';

import * as fromStore from '../../store';
import * as fromUserReducer from '../../store/reducers/user.reducer';
import * as fromSelectors from '../../store/selectors/';
import { User } from './../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserHasAccessGuard implements CanActivateChild {
    constructor(private store: Store<fromUserReducer.UserState>) {}

    canActivateChild(): Observable<any> {
        return this.checkStore().pipe(
            switchMap((user: User) => {
                if (user.role === 'recruiter') {
                    if (user.activated) {
                        console.log('RECRUITER IS ACTIVATED');
                        return of(true);
                    } else {
                        console.log('RECRUITER IS NOT ACTIVATED => REDIRECT');
                        this.store.dispatch(new fromStore.Go({ path: ['/recruiters/onboarding'] }));
                        return of(false);
                    }
                } else {
                    console.log('User has access to this route');
                    return of(true);
                }
            }),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<User> {
        return this.store.pipe(
            select(fromSelectors.getUserEntity),
            tap((user: User) => {
                if (!user) {
                    this.store.dispatch(new fromStore.LoadUser());
                }
            }),
            filter((user) => !!user),
            take(1)
        );
    }
}
