import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Message } from 'primeng/components/common/api';
import { AuthService } from './../auth.service';




@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
    msgs: Message[] = [];
    contentLoading = false;

    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router) {
        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: ['']
        });
    }

    ngOnInit() {
    }

    onSignInWithGoogle() {
        this.contentLoading = true;
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(userData => {
                this.authService.getUserData()
                    .subscribe(user_data => {
                        this.authService.signInWithGoogle(userData.idToken, user_data)
                        .subscribe(response => {
                            this.msgs = [];
                            this.authService.setSession(response);
                            this.router.navigateByUrl('/');
                        }, response => {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                        });
                    }, error => {
                        this.authService.signInWithGoogle(userData.idToken)
                        .subscribe(response => {
                            this.msgs = [];
                            this.authService.setSession(response);
                            this.router.navigateByUrl('/');
                        }, response => {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                        });
                    });
            })
            .catch(error => console.error(error));
    }


    onSignIn(event) {
        event.preventDefault();
        if (!this.signinForm.valid) {
            this.markFormGroupTouched(this.signinForm);
            return;
        }
        this.contentLoading = true;
        const val = this.signinForm.value;
        const remember = (val.remember && val.remember.length) ? true : false;
        this.authService.signin(val.email, val.password, remember)
            .subscribe(
                response => {
                    this.contentLoading = false;
                    this.msgs = [];
                    this.authService.setSession(response);
                    this.router.navigateByUrl('/');
                },
                response => {
                    this.contentLoading = false;
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
