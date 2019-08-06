import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Job } from './../../../../../../core/models/job';
import { LOAD_JOB_CANDIDATES, LoadJobCandidates } from './../actions/jobCandidates.action';

import * as fromServices from '../../../../../../core/services';
import * as fromRoot from '../../../../../../store';
import * as jobCandidatesActions from '../actions/jobCandidates.action';

@Injectable()
export class JobCandidatesEffect {
    constructor(private actions$: Actions, private jobService: fromServices.JobService) {}

    @Effect() LoadJobCandidates$: Observable<Action> = this.actions$.pipe(
        ofType(jobCandidatesActions.LOAD_JOB_CANDIDATES),
        map((action: jobCandidatesActions.LoadJobCandidates) => action.payload),
        switchMap((jobId: string) => {
            return this.jobService.getCandidates(jobId).pipe(
                map((candidates: any) => new jobCandidatesActions.LoadJobCandidatesSuccess({ jobId, candidates })),
                catchError((error) => of(new jobCandidatesActions.LoadJobCandidatesFail(error)))
            );
        })
    );
}
