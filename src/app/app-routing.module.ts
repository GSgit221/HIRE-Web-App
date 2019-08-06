import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, BrowserGuard } from './core/guards';

import { PageNotFoundComponent, UnsupportedBrowserComponent } from './core/components';
import { StartComponent } from './core/components/start.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [BrowserGuard, AuthGuard],
        component: StartComponent
    },
    {
        path: 'auth',
        canActivateChild: [BrowserGuard],
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'tenant/:tenantId/hire',
        canActivateChild: [BrowserGuard],
        loadChildren: './products/hire/hire.module#HireModule'
    },
    {
        path: 'recruiters',
        canActivateChild: [BrowserGuard],
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
