import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { EmailTemplatesComponent } from './email-templates.component';

const routes: Routes = [
    {
        path: '',
        component: EmailTemplatesComponent
    }
];
@NgModule({
    declarations: [EmailTemplatesComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailTemplatesModule {}
