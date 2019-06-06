import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../../../../modules/shared/shared.module';
import { EmailTemplateItemComponent } from './email-template-item/email-template-item.component';
import { EmailTemplatesListComponent } from './email-templates-list/email-templates-list.component';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const routes: Routes = [
    {
        path: '',
        component: EmailTemplatesListComponent,
        canActivate: [fromGuards.EmailsGuard]
    },
    {
        path: 'new',
        component: EmailTemplateItemComponent,
        canActivate: [fromGuards.EmailsGuard]
    },
    {
        path: ':emailTemplateId',
        component: EmailTemplateItemComponent,
        canActivate: [fromGuards.EmailExistsGuard]
    }
];
@NgModule({
    declarations: [EmailTemplatesListComponent, EmailTemplateItemComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('email_templates', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...fromGuards.guards],
    exports: [RouterModule]
})
export class EmailTemplatesModule {}
