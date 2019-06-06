import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../../../core/services';
import * as fromRoot from '../../../../store';
import * as jobActions from '../actions/jobs.action';
import { Job } from './../../../../core/models/job';

@Injectable()
export class JobsEffect {
    constructor(private actions$: Actions, private jobService: fromServices.JobService) {}

    @Effect() loadJobs$: Observable<Action> = this.actions$.pipe(
        ofType(jobActions.LOAD_JOBS),
        switchMap(() => {
            return this.jobService.getAll().pipe(
                map((jobs: any) => new jobActions.LoadJobsSuccess(jobs)),
                catchError((error) => of(new jobActions.LoadJobsFail(error)))
            );
        })
    );

    @Effect() updateJob$: Observable<Action> = this.actions$.pipe(
        ofType(jobActions.UPDATE_JOB),
        map((action: jobActions.UpdateJob) => action.payload),
        switchMap((response: { id: string; data: Job }) => {
            return this.jobService.updateJob(response.id, response.data).pipe(
                map((job: any) => new jobActions.UpdateJobSuccess(job)),
                catchError((error) => of(new jobActions.UpdateJobFail(error)))
            );
        })
    );

    @Effect() bulkDeleteJobs$: Observable<Action> = this.actions$.pipe(
        ofType(jobActions.BULK_DELETE_JOBS),
        map((action: jobActions.BulkDeleteJobs) => action.payload),
        switchMap((data) => {
            return this.jobService.bulkDeleteJobs(data).pipe(
                map(() => new jobActions.BulkDeleteJobsSuccess(data)),
                catchError((error) => of(new jobActions.BulkDeleteJobsFail(error)))
            );
        })
    );
}
