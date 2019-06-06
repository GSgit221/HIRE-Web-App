import { Job } from './../../../../core/models/job';

import * as fromJobsActions from '../actions/jobs.action';

export interface JobsListState {
    entities: { [id: string]: Job };
    loaded: boolean;
    loading: boolean;
}

export const initialState: JobsListState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromJobsActions.JobsAction): JobsListState {
    switch (action.type) {
        case fromJobsActions.LOAD_JOBS: {
            return { ...state, loading: true };
        }

        case fromJobsActions.LOAD_JOBS_FAIL: {
            return { ...state, loading: false, loaded: false };
        }

        case fromJobsActions.LOAD_JOBS_SUCCESS: {
            const jobs = action.payload;
            const entities = jobs.reduce(
                (_entities: { [id: string]: Job }, job) => {
                    return {
                        ..._entities,
                        [job.id]: job
                    };
                },
                {
                    ...state.entities
                }
            );
            return { ...state, loading: false, loaded: true, entities };
        }

        case fromJobsActions.CREATE_JOB_SUCCESS: {
            const job = action.payload;
            const entities = { ...state.entities, [job.id]: job };
            return { ...state, entities };
        }

        case fromJobsActions.UPDATE_JOB_SUCCESS: {
            const job = action.payload;
            console.log('UPDATE JOB SUCCESS', job);
            const entities = { ...state.entities, [job.id]: job };
            return { ...state, entities };
        }

        case fromJobsActions.BULK_DELETE_JOBS_SUCCESS: {
            const ids = action.payload;
            const entities = { ...state.entities };
            ids.forEach((id) => {
                delete entities[id];
            });
            return { ...state, entities };
        }
    }

    return state;
}

export const getJobsLoading = (state: JobsListState) => state.loading;
export const getJobsLoaded = (state: JobsListState) => state.loaded;
export const getJobEntities = (state: JobsListState) => state.entities;
