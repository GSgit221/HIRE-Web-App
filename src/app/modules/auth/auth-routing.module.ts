import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { UnauthGuard } from './../../core/guards/unauth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout.component';
import { SignupComponent } from './signup/signup.component';
import { SSOComponent } from './sso/sso.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [UnauthGuard],
        children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'set-password', component: SetPasswordComponent },
            { path: 'signin-sso', component: SSOComponent }
        ]
    },

    { path: 'signout', component: SignoutComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
