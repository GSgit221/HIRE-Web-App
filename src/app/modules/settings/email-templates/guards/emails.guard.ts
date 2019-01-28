import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromEmailsSelectors from '../store/selectors/emails.selector';

@Injectable()
export class EmailsGuard implements CanActivate {
    constructor(private store: Store<fromStore.EmailsState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromEmailsSelectors.getEmailsLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadEmails());
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}
