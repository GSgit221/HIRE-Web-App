import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromQuestionnaires from './questionnaires.reducer';

export interface QuestionnairesState {
    questionnaires: fromQuestionnaires.QuestionnairesListState;
}

export const reducers: ActionReducerMap<QuestionnairesState> = { questionnaires: fromQuestionnaires.reducer };

export const getQuestionnairesFeatureState = createFeatureSelector<QuestionnairesState>('questionnaires');

export const getQuestionnairesState = createSelector(
    getQuestionnairesFeatureState,
    (state: QuestionnairesState) => state.questionnaires
);
