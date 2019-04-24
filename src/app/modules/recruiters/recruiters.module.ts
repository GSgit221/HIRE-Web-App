import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ApplicationProgressComponent } from './components/application-progress/application-progress.component';
import { ApprovalComponent } from './pages/approval/approval.component';

import { OnboardingSidebarComponent } from './components/onboarding-sidebar/onboarding-sidebar.component';
import { OnboardingComponent } from './containers/onboarding/onboarding.component';
import { RecruitersComponent } from './containers/recruiters/recruiters.component';
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
        ApplicationProgressComponent
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecruitersModule {}
