import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: 'questionnaires',
        loadChildren: 'src/app/modules/settings/questionnaires/questionnaires.module#QuestionnairesModule'
    },
    {
        path: 'scorecards',
        loadChildren: 'src/app/modules/settings/scorecards/scorecards.module#ScorecardsModule'
    },
    {
        path: 'email-templates',
        loadChildren: 'src/app/modules/settings/email-templates/email-templates.module#EmailTemplatesModule'
    },
    {
        path: 'integrations',
        loadChildren: 'src/app/modules/settings/integrations/integrations.module#IntegrationsModule'
    },
    {
        path: 'users',
        loadChildren: 'src/app/modules/settings/users/users.module#UsersModule'
    },
    {
        path: 'billing',
        loadChildren: 'src/app/modules/settings/billing/billing.module#BillingModule'
    }
];
@NgModule({
    declarations: [],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsModule {}
