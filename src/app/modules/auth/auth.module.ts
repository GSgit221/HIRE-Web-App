import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteSignupComponent } from './complete-signup/complete-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout.component';
import { SignupComponent } from './signup/signup.component';

import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'complete-signup', component: CompleteSignupComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'set-password', component: SetPasswordComponent }
];
@NgModule({
    declarations: [
        CompleteSignupComponent,
        ResetPasswordComponent,
        SetPasswordComponent,
        SigninComponent,
        SignoutComponent,
        SignupComponent
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthModule {}
