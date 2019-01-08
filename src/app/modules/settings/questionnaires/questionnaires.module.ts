import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionnaireNewComponent } from './questionnaire-new/questionnaire-new.component';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

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
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionnairesModule {}
