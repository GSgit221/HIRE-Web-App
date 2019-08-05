import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromJobCandiatesSelector from '../store/selectors/jobCandidates.selector';

@Injectable()
export class CandidatesGuard implements CanActivate {
    constructor(private store: Store<fromStore.JobsState>) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const jobId = route.params.jobId;
        return this.checkStore(jobId).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(jobId): Observable<boolean> {
        return this.store.pipe(
            select(fromJobCandiatesSelector.getJobCandidatesLoaded, { jobId }),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadJobCandidates(jobId));
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}
