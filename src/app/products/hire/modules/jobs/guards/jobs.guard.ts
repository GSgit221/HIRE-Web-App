import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromJobsSelectors from '../store/selectors/jobs.selector';

@Injectable()
export class JobsGuard implements CanActivate {
    constructor(private store: Store<fromStore.JobsState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromJobsSelectors.getJobsLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadJobs());
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}
