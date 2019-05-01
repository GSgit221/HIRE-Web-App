import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterRoleGuard } from './guards/recruiter-role.guard';

import { AuthGuard } from './../../guards/auth.guard';
import { UnauthGuard } from './../../guards/unauth.guard';
import { SharedModule } from './../shared/shared.module';
import { ApplicationProgressComponent } from './components/application-progress/application-progress.component';
import { OnboardingSidebarComponent } from './components/onboarding-sidebar/onboarding-sidebar.component';
import { OnboardingComponent } from './containers/onboarding/onboarding.component';
import { RecruitersAuthComponent } from './containers/recruiters-auth/recruiters-auth.component';
import { RecruitersComponent } from './containers/recruiters/recruiters.component';
import { ApprovalComponent } from './pages/approval/approval.component';
import { RecruitersResetPasswordComponent } from './pages/auth/recruiters-reset-password/recruiters-reset-password.component';
import { RecruitersSetPasswordComponent } from './pages/auth/recruiters-set-password/recruiters-set-password.component';
import { RecruitersSigninComponent } from './pages/auth/recruiters-signin/recruiters-signin.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { DocumentsComponent } from './pages/documents/documents.component';

const routes: Routes = [
    {
        path: '',
        component: RecruitersComponent
    },
    {
        path: 'onboarding',
        component: OnboardingComponent,
        canActivateChild: [AuthGuard, RecruiterRoleGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'company-details'
            },
            { path: 'company-details', component: CompanyDetailsComponent },
            { path: 'documents', component: DocumentsComponent },
            { path: 'approval', component: ApprovalComponent }
        ]
    },
    {
        path: 'auth',
        canActivateChild: [UnauthGuard],
        component: RecruitersAuthComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'signin'
            },
            { path: 'signin', component: RecruitersSigninComponent },
            { path: 'reset-password', component: RecruitersResetPasswordComponent },
            { path: 'set-password', component: RecruitersSetPasswordComponent }
        ]
    }
];
@NgModule({
    declarations: [
        CompanyDetailsComponent,
        DocumentsComponent,
        ApprovalComponent,
        RecruitersComponent,
        OnboardingComponent,
        OnboardingSidebarComponent,
        ApplicationProgressComponent,
        RecruitersAuthComponent,
        RecruitersSigninComponent,
        RecruitersResetPasswordComponent,
        RecruitersSetPasswordComponent
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecruitersModule {}
