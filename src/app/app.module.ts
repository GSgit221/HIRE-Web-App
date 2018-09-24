import { LoaderComponent } from './shared/loader/loader.component';
import { UserResolver } from './resolvers/user.resolver';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditorModule } from 'primeng/editor';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AutoSizeInputModule } from 'ngx-autosize-input';


import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptorProviders } from './http-interceptors';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { ScorecardsComponent } from './settings/scorecards/scorecards.component';
import { EmailTemplatesComponent } from './settings/email-templates/email-templates.component';
import { IntegrationsComponent } from './settings/integrations/integrations.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { JobItemUnpublishedComponent } from './jobs/job-item-unpublished/job-item-unpublished.component';
import { JobItemPublishedComponent } from './jobs/job-item-published/job-item-published.component';
import { MultiSelectComponent } from './shared/multi-select/multi-select.component';
import { CandidateItemComponent } from './candidates/candidate-item/candidate-item.component';
import { StageSettingsComponent } from './jobs/stages/stage-settings/stage-settings.component';
import { QuestionnairesListComponent } from './settings/questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionsListComponent } from './settings/questionnaires/questions-list/questions-list.component';
import { QuestionItemComponent } from './settings/questionnaires/question-item/question-item.component';
import { JobApplicationComponent } from './applications/job-application/job-application.component';
import { ApplicationsSigninComponent } from './applications/auth/signin/signin.component';
import { ApplicationsSignupComponent } from './applications/auth/signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

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
        JobItemUnpublishedComponent,
        JobItemPublishedComponent,
        MultiSelectComponent,
        CandidateItemComponent,
        StageSettingsComponent,
        QuestionnairesListComponent,
        QuestionsListComponent,
        QuestionItemComponent,
        JobApplicationComponent,
        ApplicationsSigninComponent,
        ApplicationsSignupComponent
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
        EffectsModule.forRoot([AppEffects])
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        AuthService,
        httpInterceptorProviders,
        AuthGuard,
        UserResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
