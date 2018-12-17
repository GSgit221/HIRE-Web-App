import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { IntegrationsComponent } from './integrations.component';

const routes: Routes = [
    {
        path: '',
        component: IntegrationsComponent
    }
];
@NgModule({
    declarations: [IntegrationsComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegrationsModule {}
