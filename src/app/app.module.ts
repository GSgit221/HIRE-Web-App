import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NgDragDropModule } from 'ng-drag-drop';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { CookieService } from 'ngx-cookie-service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { ApplicationsSigninComponent } from './applications/auth/signin/signin.component';
import { ApplicationsSignupComponent } from './applications/auth/signup/signup.component';
import { JobApplicationComponent } from './applications/job-application/job-application.component';
import { AuthService } from './auth/auth.service';
import { CompleteSignupComponent } from './auth/complete-signup/complete-signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CandidateItemFeedbackComponent } from './candidates/candidate-item-feedback/candidate-item-feedback.component';
import { CandidateItemComponent } from './candidates/candidate-item/candidate-item.component';
import { NewCandidateItemComponent } from './candidates/new-candidate-item/new-candidate-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { TakeoverComponent } from './dashboard/sidebar/takeover/takeover.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { DragEnterDirective } from './directives/drag-enter.directive';
import { ToggleDetailsDirective } from './directives/toggle-details.directive';
import { JobEffects } from './effects/job/job.effects';
import { UserEffects } from './effects/user/user.effects';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptorProviders } from './http-interceptors';
import { JobItemEditComponent } from './jobs/job-item-edit/job-item-edit.component';
import { JobItemNewComponent } from './jobs/job-item-new/job-item-new.component';
import { JobItemViewComponent } from './jobs/job-item-view/job-item-view.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { StageSettingsComponent } from './jobs/stages/stage-settings/stage-settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { GetFitstLetterPipe } from './pipes/get-fitst-letter.pipe';
import { InitialsPipe } from './pipes/initials.pipe';
import { SortByOrderPipe } from './pipes/sort-by-order.pipe';
import { UploadFileNamePipe } from './pipes/upload-file-name.pipe';
import { metaReducers, reducers } from './reducers';
import { UserResolver } from './resolvers/user.resolver';
import { BillingDetailsComponent } from './settings/billing/billing-details/billing-details.component';
import { BillingHistoryComponent } from './settings/billing/billing-history/billing-history.component';
import { BillingPlanComponent } from './settings/billing/billing-plan/billing-plan.component';
import { BillingComponent } from './settings/billing/billing.component';
import { EmailTemplatesComponent } from './settings/email-templates/email-templates.component';
import { IntegrationsComponent } from './settings/integrations/integrations.component';
import { QuestionItemComponent } from './settings/questionnaires/question-item/question-item.component';
import { QuestionnaireNewComponent } from './settings/questionnaires/questionnaire-new/questionnaire-new.component';
import { QuestionnairesListComponent } from './settings/questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionsListComponent } from './settings/questionnaires/questions-list/questions-list.component';
import { ScorecardsComponent } from './settings/scorecards/scorecards.component';
import { UsersComponent } from './settings/users/users.component';
import { CandidateFitCircleComponent } from './shared/candidate-fit-circle/candidate-fit-circle.component';
import { FileTypeComponent } from './shared/file-type/file-type.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MultiSelectComponent } from './shared/multi-select/multi-select.component';
import { ProgressCircleComponent } from './shared/progress-circle/progress-circle.component';
import { ResumeFileTypeComponent } from './shared/resume-file-type/resume-file-type.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { SortByOrderPipe } from './pipes/sort-by-order.pipe';
import { CandidateItemFeedbackComponent } from './candidates/candidate-item-feedback/candidate-item-feedback.component';
import { CandidateItemTimelineComponent } from './candidates/candidate-item-timeline/candidate-item-timeline.component';
export function provideConfig() {
    return new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
        }
    ]);
}

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        SignoutComponent,
        DashboardComponent,
        PageNotFoundComponent,
        JobsListComponent,
        PeopleListComponent,
        SidebarComponent,
        JobItemComponent,
        ResetPasswordComponent,
        SetPasswordComponent,
        ScorecardsComponent,
        EmailTemplatesComponent,
        IntegrationsComponent,
        LoaderComponent,
        DisableControlDirective,
        DragEnterDirective,
        ToggleDetailsDirective,
        JobItemEditComponent,
        JobItemViewComponent,
        MultiSelectComponent,
        CandidateItemComponent,
        StageSettingsComponent,
        QuestionnairesListComponent,
        QuestionsListComponent,
        QuestionItemComponent,
        JobApplicationComponent,
        ApplicationsSigninComponent,
        ApplicationsSignupComponent,
        InitialsPipe,
        NewCandidateItemComponent,
        UploadFileNamePipe,
        GetFitstLetterPipe,
        FileTypeComponent,
        ResumeFileTypeComponent,
        ProgressCircleComponent,
        CandidateFitCircleComponent,
        JobItemNewComponent,
        TakeoverComponent,
        QuestionnaireNewComponent,
        UsersComponent,
        BillingPlanComponent,
        BillingComponent,
        BillingDetailsComponent,
        BillingHistoryComponent,
        CompleteSignupComponent,
        CandidateItemFeedbackComponent,
        SortByOrderPipe,
        CandidateItemTimelineComponent,
        SortByDatePipe
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NgSelectModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        EditorModule,
        PanelModule,
        PanelMenuModule,
        TooltipModule,
        NgDragDropModule.forRoot(),
        MultiSelectModule,
        SliderModule,
        SelectButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularEditorModule,
        SocialLoginModule,
        ReactiveFormsModule,
        GooglePlaceModule,
        AutoSizeInputModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects, UserEffects, JobEffects]),
        InfiniteScrollModule,
        CreditCardDirectivesModule
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        AuthService,
        httpInterceptorProviders,
        AuthGuard,
        UserResolver,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
