import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

import { SharedModule } from '../shared/shared.module';
import { ThemeComponent } from './theme/theme.component';

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
    },
    {
        path: 'theme',
        component: ThemeComponent
    }
];
@NgModule({
    declarations: [ThemeComponent],
    imports: [SharedModule, RouterModule.forChild(routes), ColorPickerModule],
    exports: [RouterModule]
})
export class SettingsModule {}
