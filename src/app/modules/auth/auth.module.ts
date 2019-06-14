import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './../../core/guards/unauth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout.component';
import { SignupComponent } from './signup/signup.component';

import { NgOtpInputModule } from '../ng-otp-input/ng-otp-input.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SSOComponent } from './sso/sso.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
    declarations: [
        ResetPasswordComponent,
        SetPasswordComponent,
        SigninComponent,
        SignoutComponent,
        SignupComponent,
        LayoutComponent,
        SSOComponent
    ],
    imports: [SharedModule, AuthRoutingModule, NgOtpInputModule],
    exports: [RouterModule]
})
export class AuthModule {}
