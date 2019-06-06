import { SharedModule } from './../../modules/shared/shared.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../core/guards/auth.guard';
import { UserHasAccessGuard } from './../../core/guards/user-has-access.guard';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard, UserHasAccessGuard],
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    }
];
@NgModule({
    declarations: [],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HireModule {}
