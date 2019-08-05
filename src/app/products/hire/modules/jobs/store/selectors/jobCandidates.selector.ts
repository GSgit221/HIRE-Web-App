import { createSelector } from '@ngrx/store';
import { Job } from './../../../../../../core/models/job';
import { CandidatesListState } from './../reducers/jobCandidates.reducer';

import * as fromFeature from '../reducers';
import * as fromJobCsandidates from '../reducers/jobCandidates.reducer';
import * as fromRoot from './../../../../../../store';

export const getJobCandidatesEntities = createSelector(
    fromFeature.getJobCandidatesState,
    (state: CandidatesListState, props: any) => (state && state[props.jobId] ? state[props.jobId].entities : null)
);

export const getJobCandidates = createSelector(
    fromFeature.getJobCandidatesState,
    (state, props) => {
        const entities = state && state[props.jobId] ? state[props.jobId].entities : {};
        return Object.keys(entities).map((id) => entities[id]);
    }
);

export const getJobCandidatesLoading = createSelector(
    fromFeature.getJobCandidatesState,
    (state, props) => (state && state[props.jobId] ? state[props.jobId].loading : false)
);

export const getJobCandidatesLoaded = createSelector(
    fromFeature.getJobCandidatesState,
    (state, props) => (state && state[props.jobId] ? state[props.jobId].loaded : false)
);

export const getJobCandidate = createSelector(
    fromFeature.getJobCandidatesState,
    (state, props) => {
        if (
            state &&
            state[props.jobId] &&
            state[props.jobId].entities &&
            state[props.jobId].entities[props.candidateId]
        ) {
            return state[props.jobId].entities[props.candidateId];
        } else {
            return null;
        }
    }
);
