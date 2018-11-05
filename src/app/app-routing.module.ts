import { QuestionnaireNewComponent } from './settings/questionnaires/questionnaire-new/questionnaire-new.component';
import { ApplicationsSigninComponent } from './applications/auth/signin/signin.component';
import { ApplicationsSignupComponent } from './applications/auth/signup/signup.component';
import { JobApplicationComponent } from './applications/job-application/job-application.component';
import { QuestionItemComponent } from './settings/questionnaires/question-item/question-item.component';
import { QuestionnairesListComponent } from './settings/questionnaires/questionnaires-list/questionnaires-list.component';
import { StageSettingsComponent } from './jobs/stages/stage-settings/stage-settings.component';
import { CandidateItemComponent } from './candidates/candidate-item/candidate-item.component';
import { SignoutComponent } from './auth/signout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { EmailTemplatesComponent } from './settings/email-templates/email-templates.component';
import { IntegrationsComponent } from './settings/integrations/integrations.component';
import { ScorecardsComponent } from './settings/scorecards/scorecards.component';
import { QuestionsListComponent } from './settings/questionnaires/questions-list/questions-list.component';
import { UsersComponent } from './settings/users/users.component';

const appRoutes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'set-password', component: SetPasswordComponent },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'jobs'
        }, {
            path: 'jobs',
            component: JobsListComponent
        }, {
            path: 'jobs/:id',
            component: JobItemComponent
        }, {
            path: 'jobs/:jobId/candidate/:candidateId',
            component: CandidateItemComponent
        }, {
            path: 'jobs/:id/stages/:stageId',
            component: StageSettingsComponent
        }, {
            path: 'people',
            component: PeopleListComponent
        }, {
            path: 'questionnaires',
            component: QuestionnairesListComponent
        }, {
            path: 'questionnaires/new',
            component: QuestionnaireNewComponent
        }, {
            path: 'questionnaires/:id/questions',
            component: QuestionsListComponent
        }, {
            path: 'questionnaires/:id/questions/:questionId',
            component: QuestionItemComponent
        }, {
            path: 'scorecards',
            component: ScorecardsComponent
        }, {
            path: 'email-templates',
            component: EmailTemplatesComponent
        }, {
            path: 'integrations',
            component: IntegrationsComponent
        }, {
            path: 'users',
            component: UsersComponent
        }]
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
