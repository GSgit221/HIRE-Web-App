import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from './../../core/guards/unauth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout.component';
import { SignupComponent } from './signup/signup.component';

import { SharedModule } from '../../modules/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    declarations: [
        ResetPasswordComponent,
        SetPasswordComponent,
        SigninComponent,
        SignoutComponent,
        SignupComponent,
        LayoutComponent
    ],
    imports: [SharedModule, AuthRoutingModule],
    exports: [RouterModule]
})
export class AuthModule {}
