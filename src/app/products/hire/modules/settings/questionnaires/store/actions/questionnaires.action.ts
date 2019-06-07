import { Action } from '@ngrx/store';

import { Questionnaire } from './../../../../../../../core/models/questionnaire';

// load Questionnaires
export const LOAD_QUESTIONNAIRES = '[Questionnaires] Load Questionnaires';
export const LOAD_QUESTIONNAIRES_FAIL = '[Questionnaires] Load Questionnaires Fail';
export const LOAD_QUESTIONNAIRES_SUCCESS = '[Questionnaires] Load Questionnaires Success';

export class LoadQuestionnaires implements Action {
    readonly type = LOAD_QUESTIONNAIRES;
}

export class LoadQuestionnairesFail implements Action {
    readonly type = LOAD_QUESTIONNAIRES_FAIL;
    constructor(public payload: any) {}
}

export class LoadQuestionnairesSuccess implements Action {
    readonly type = LOAD_QUESTIONNAIRES_SUCCESS;
    constructor(public payload: Questionnaire[]) {}
}

export type QuestionnairesAction = LoadQuestionnaires | LoadQuestionnairesFail | LoadQuestionnairesSuccess;
