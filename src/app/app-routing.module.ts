import { UserResolver } from './resolvers/user.resolver';
import { AuthGuard } from './guards/auth.guard';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PeopleListComponent } from './people/people-list/people-list.component';

const appRoutes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'set-password', component: SetPasswordComponent },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        resolve: { user: UserResolver },
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'jobs'
        }, {
            path: 'jobs',
            component: JobsListComponent
        }, {
            path: 'jobs/:id',
            component: JobItemComponent
        }, {
            path: 'people',
            component: PeopleListComponent
        }]
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(
        appRoutes,
        { enableTracing: true }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
