import { createSelector } from '@ngrx/store';
import { Job } from './../../../../core/models/job';

import * as fromFeature from '../reducers';
import * as fromJobs from '../reducers/jobs.reducer';
import * as fromRoot from './../../../../store';

export const getJobsEntities = createSelector(
    fromFeature.getJobsState,
    fromJobs.getJobEntities
);

export const getAllJobs = createSelector(
    getJobsEntities,
    (entities) => {
        return Object.keys(entities).map((id) => entities[id]);
    }
);

export const getJobsLoading = createSelector(
    fromFeature.getJobsState,
    fromJobs.getJobsLoading
);

export const getJobsLoaded = createSelector(
    fromFeature.getJobsState,
    fromJobs.getJobsLoaded
);

export const getSelectedJob = createSelector(
    getJobsEntities,
    fromRoot.getRouterState,
    (entities, router): Job => {
        return router.state && entities[router.state.params.id];
    }
);
