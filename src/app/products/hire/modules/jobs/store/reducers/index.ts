import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromJobCandidates from './jobCandidates.reducer';
import * as fromJobs from './jobs.reducer';

export interface JobsState {
    jobs: fromJobs.JobsListState;
    jobCandidates: fromJobCandidates.CandidatesListState;
}

export const reducers: ActionReducerMap<JobsState> = {
    jobs: fromJobs.reducer,
    jobCandidates: fromJobCandidates.reducer
};

export const getJobsFeatureState = createFeatureSelector<JobsState>('jobs');

export const getJobsState = createSelector(
    getJobsFeatureState,
    (state: JobsState) => state.jobs
);

export const getJobCandidatesState = createSelector(
    getJobsFeatureState,
    (state: JobsState) => state.jobCandidates
);
