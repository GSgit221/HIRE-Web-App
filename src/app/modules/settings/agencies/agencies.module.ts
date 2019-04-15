import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciesComponent } from './agencies.component';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AgenciesComponent
    }
];
@NgModule({
    declarations: [AgenciesComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgenciesModule {}
