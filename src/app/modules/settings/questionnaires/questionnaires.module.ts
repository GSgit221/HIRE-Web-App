import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionnaireNewComponent } from './questionnaire-new/questionnaire-new.component';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

// store
import { effects, reducers } from './store';

const routes: Routes = [
    {
        path: '',
        component: QuestionnairesListComponent
    },
    {
        path: 'new',
        component: QuestionnaireNewComponent
    },
    {
        path: ':id/questions',
        component: QuestionsListComponent
    },
    {
        path: ':id/questions/:questionId',
        component: QuestionItemComponent
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
    exports: [RouterModule]
})
export class QuestionnairesModule {}
