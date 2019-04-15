import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import * as fromGuards from './guards';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionnaireNewComponent } from './questionnaire-new/questionnaire-new.component';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { effects, reducers } from './store';

// store
const routes: Routes = [
    {
        path: '',
        component: QuestionnairesListComponent,
        canActivate: [fromGuards.QuestionnairesGuard]
    },
    {
        path: 'new',
        component: QuestionnaireNewComponent
    },
    {
        path: ':questionnaireId/questions',
        component: QuestionsListComponent,
        canActivate: [fromGuards.QuestionnairesGuard]
    },
    {
        path: ':questionnaireId/questions/:questionId',
        component: QuestionItemComponent,
        canActivate: [fromGuards.QuestionnairesGuard]
    }
];
@NgModule({
    declarations: [
        QuestionItemComponent,
        QuestionnaireNewComponent,
        QuestionnairesListComponent,
        QuestionsListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('questionnaires', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...fromGuards.guards],
    exports: [RouterModule]
})
export class QuestionnairesModule {}
