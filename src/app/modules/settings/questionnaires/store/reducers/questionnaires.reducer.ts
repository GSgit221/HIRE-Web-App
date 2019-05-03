import { Questionnaire } from './../../../../../core/models/questionnaire';
import * as fromQuestionnairs from './../actions';

export interface QuestionnairesListState {
    entities: { [id: string]: Questionnaire };
    loaded: boolean;
    loading: boolean;
}

export const initialState: QuestionnairesListState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromQuestionnairs.QuestionnairesAction): QuestionnairesListState {
    switch (action.type) {
        case fromQuestionnairs.LOAD_QUESTIONNAIRES: {
            return { ...state, loading: true };
        }

        case fromQuestionnairs.LOAD_QUESTIONNAIRES_FAIL: {
            return { ...state, loading: false, loaded: false };
        }

        case fromQuestionnairs.LOAD_QUESTIONNAIRES_SUCCESS: {
            const questionnaires = action.payload;
            const entities = questionnaires.reduce(
                (_entities: { [id: string]: Questionnaire }, questionnaire) => {
                    return {
                        ..._entities,
                        [questionnaire.id]: questionnaire
                    };
                },
                {
                    ...state.entities
                }
            );
            return { ...state, loading: false, loaded: true, entities };
        }
    }

    return state;
}

export const getQuestionnairesLoading = (state: QuestionnairesListState) => state.loading;
export const getQuestionnairesLoaded = (state: QuestionnairesListState) => state.loaded;
export const getQuestionnairesEntities = (state: QuestionnairesListState) => state.entities;
