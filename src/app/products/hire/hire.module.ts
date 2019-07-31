import { SharedModule } from './../../modules/shared/shared.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, BrowserGuard, UserHasAccessGuard } from './../../core/guards';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [BrowserGuard, AuthGuard, UserHasAccessGuard],
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    }
];
@NgModule({
    declarations: [],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HireModule {}
