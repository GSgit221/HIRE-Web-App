import { Stage } from '@app/core/models';
import * as fromJobCandidatesActions from '../actions/jobCandidates.action';
import { Candidate } from './../../../../../../core/models/candidate';

export interface CandidatesListState {
    [jobId: string]: {
        entities: { [id: string]: Candidate };
        loaded: boolean;
        loading: boolean;
    };
}
export function reducer(state = {}, action: fromJobCandidatesActions.JobCandidatesAction): CandidatesListState {
    switch (action.type) {
        case fromJobCandidatesActions.LOAD_JOB_CANDIDATES: {
            const newState = { ...state };
            newState[action.payload] = {
                entities: state[action.payload] ? state[action.payload].entities : {},
                loaded: false,
                loading: true
            };
            return newState;
        }

        case fromJobCandidatesActions.LOAD_JOB_CANDIDATES_FAIL: {
            const newState = { ...state };
            newState[action.payload.jobId].loading = false;
            newState[action.payload.jobId].loaded = false;
            return newState;
        }

        case fromJobCandidatesActions.LOAD_JOB_CANDIDATES_SUCCESS: {
            const jobId = action.payload.jobId;
            const candidates = action.payload.candidates;
            const entities = candidates.reduce((_entities: { [id: string]: Candidate }, candidate) => {
                return {
                    ..._entities,
                    [candidate.id]: candidate
                };
            }, {});
            const newState = { ...state };
            newState[jobId].entities = entities;
            newState[jobId].loading = false;
            newState[jobId].loaded = true;
            return newState;
        }
    }

    return state;
}

// export const getCandidatesLoading = (state: CandidatesListState, jobId: string) =>
//     state[jobId] ? state[jobId].loading : null;
// export const getCandidatesLoaded = (state: CandidatesListState, jobId: string) =>
//     state[jobId] ? state[jobId].loaded : null;
// export const getCandidatesEntities = (state: CandidatesListState, jobId: string) =>
//     state[jobId] ? state[jobId].entities : null;
