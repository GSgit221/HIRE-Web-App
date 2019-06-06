import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { UtilitiesService } from '@app/core/services';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { LoadUser } from './../../../../../store/actions/user.action';

import * as fromStore from '../../../../../store';
import * as fromSelectors from '../../../../../store/selectors/';
import { User } from './../../../../../core/models/user';
import * as fromUserReducer from './../../../../../store/reducers/user.reducer';

@Injectable({
    providedIn: 'root'
})
export class RecruiterRoleGuard implements CanActivateChild {
    baseUrl: string;
    constructor(private store: Store<fromUserReducer.UserState>, private utilities: UtilitiesService) {
        this.baseUrl = this.utilities.getHireBaseUrl();
    }

    canActivateChild(): Observable<any> {
        return this.checkStore().pipe(
            switchMap((user: User) => {
                if (user.role !== 'recruiter' || user.activated) {
                    console.log('REDIRECT TO DAHSBOARD');
                    this.store.dispatch(new fromStore.Go({ path: [this.baseUrl] }));
                    return of(false);
                } else {
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
