import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

import { environment } from '@env/environment';
import { FormHelperService } from '../../../core/services/form-helper.service';
import { AuthService } from '../auth.service';
import { UtilitiesService } from './../../../core/services/utilities.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
    msgs: Message[] = [];
    contentLoading = false;
    googleSigninLink = '';

    constructor(
        private location: Location,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService
    ) {
        this.signinForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', Validators.required]
        });
        this.googleSigninLink = this.authService.getGoogleSigninLink();
    }

    ngOnInit() {}

    onGoogleSigninClick(event) {
        event.preventDefault();
        this.contentLoading = true;
        this.authService
            .onGoogleSignin()
            .then((response) => {
                this.authService.signInWithGoogle(response).subscribe(
                    (response: any) => {
                        this.contentLoading = false;
                        this.msgs = [];
                        this.authService.setSession(response);
                        this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
                    },
                    (response) => {
                        this.contentLoading = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                    }
                );
            })
            .catch((errorResponse) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: errorResponse.error || 'Error' });
            });
    }

    onSignIn(event) {
        event.preventDefault();
        if (!this.signinForm.valid) {
            this.formHelper.markFormGroupTouched(this.signinForm);
            return;
        }
        this.contentLoading = true;
        const val = this.signinForm.value;
        this.authService.signin(val.email, val.password).subscribe(
            (response: any) => {
                this.contentLoading = false;
                this.msgs = [];
                this.authService.setSession(response);
                this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
            },
            (response) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
