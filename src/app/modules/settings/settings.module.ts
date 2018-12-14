import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: 'questionnaires',
        loadChildren: './questionnaires/questionnaires.module#QuestionnairesModule'
    },
    // {
    //     path: 'scorecards',
    //     loadChildren: './scorecards/scorecards.module#ScorecardsModule'
    // },
    {
        path: 'email-templates',
        loadChildren: './email-templates/email-templates.module#EmailTemplatesModule'
    },
    {
        path: 'integrations',
        loadChildren: './integrations/integrations.module#IntegrationsModule'
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
    },
    {
        path: 'billing',
        loadChildren: './billing/billing.module#BillingModule'
    }
];
@NgModule({
    declarations: [],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsModule {}
