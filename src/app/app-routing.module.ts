import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserHasAccessGuard } from './core/guards/user-has-access.guard';
import { UserLoadedGuard } from './core/guards/user-loaded.guard';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'dashboard',
        canActivateChild: [AuthGuard, UserLoadedGuard, UserHasAccessGuard],
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'recruiters',
        loadChildren: './modules/recruiters/recruiters.module#RecruitersModule'
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { enableTracing: false, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
