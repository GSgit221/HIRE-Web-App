import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from './../auth.service';
import { Message } from 'primeng/components/common/api';
import { PasswordValidation } from './../../validators/password.validator';

@Component({
    selector: 'app-set-password',
    templateUrl: './set-password.component.html',
    styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
    token: string;
    setPasswordForm: FormGroup;
    msgs: Message[] = [];

    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.setPasswordForm = this.fb.group({
            password: ['', Validators.required],
            confirm_password: ['', Validators.required],
            agreed: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    ngOnInit() {
        this.token = this.route.snapshot.queryParamMap.get('token');
    }


    onSubmit(event) {
        event.preventDefault();
        if (!this.setPasswordForm.valid) {
            this.markFormGroupTouched(this.setPasswordForm);
            return;
        }
        const val = this.setPasswordForm.value;
        this.authService.setPassword(val.password, this.token)
            .subscribe(
                response => {
                    this.msgs = [];
                    this.authService.setSession(response);
                    this.router.navigateByUrl('/');
                },
                response => {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                }
            );
    }


    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

}
