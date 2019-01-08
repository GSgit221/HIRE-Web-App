import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LOAD_QUESTIONNAIRES } from './../actions/questionnaires.action';

import * as fromServices from '../../../../../services';
import * as questionnairesActions from './../actions';

@Injectable()
export class QuestionnairesEffect {
    constructor(private actions$: Actions, private questionnaireService: fromServices.QuestionnaireService) {}

    @Effect() loadQuestionnaires$: Observable<Action> = this.actions$
        .ofType(questionnairesActions.LOAD_QUESTIONNAIRES)
        .pipe(
            switchMap(() => {
                return this.questionnaireService.getAll().pipe(
                    map((questionnaires) => new questionnairesActions.LoadQuestionnairesSuccess(questionnaires)),
                    catchError((error) => of(new questionnairesActions.LoadQuestionnairesFail(error)))
                );
            })
        );
}
