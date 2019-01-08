import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromQuestionnaires from '../reducers/questionnaires.reducer';
export const getQuestionnairesEntities = createSelector(
    fromFeature.getQuestionnairesState,
    fromQuestionnaires.getQuestionnairesEntities
);

export const getAllQuestionnaires = createSelector(
    getQuestionnairesEntities,
    (entities) => {
        return Object.keys(entities).map((id) => entities[id]);
    }
);

export const getQuestionnairesLoading = createSelector(
    fromFeature.getQuestionnairesState,
    fromQuestionnaires.getQuestionnairesLoading
);

export const getQuestionnairesLoaded = createSelector(
    fromFeature.getQuestionnairesState,
    fromQuestionnaires.getQuestionnairesLoaded
);
