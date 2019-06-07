import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromJobs from './jobs.reducer';

export interface JobsState {
    jobs: fromJobs.JobsListState;
}

export const reducers: ActionReducerMap<JobsState> = { jobs: fromJobs.reducer };

export const getJobsFeatureState = createFeatureSelector<JobsState>('jobs');

export const getJobsState = createSelector(
    getJobsFeatureState,
    (state: JobsState) => state.jobs
);
