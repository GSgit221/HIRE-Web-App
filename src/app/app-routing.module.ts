import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

import { PageNotFoundComponent, UnsupportedBrowserComponent } from './core/components';
import { StartComponent } from './core/components/start.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: StartComponent
    },
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'tenant/:tenantId/hire',
        loadChildren: './products/hire/hire.module#HireModule'
    },
    {
        path: 'recruiters',
        loadChildren: './products/hire/modules/recruiters/recruiters.module#RecruitersModule'
    },
    { path: 'unsupported-browser', component: UnsupportedBrowserComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    declarations: [StartComponent],
    imports: [RouterModule.forRoot(appRoutes, { enableTracing: false, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
