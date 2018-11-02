import { FormHelperService } from './../../services/form-helper.service';
import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from './../auth.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    msgs: Message[] = [];

    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private utilities: UtilitiesService,
        private formHelper: FormHelperService
    ) {
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            agreed: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onSignUpWithGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(userData => {
                this.authService.getUserData()
                    .then(user_data => {
                        this.authService.signInWithGoogle(userData.idToken, user_data)
                            .subscribe(response => {
                                this.msgs = [];
                                this.authService.setSession(response);
                                this.router.navigateByUrl('/');
                            }, response => {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => console.error(error));
    }


    onSignUp(event) {
        event.preventDefault();
        if (!this.signupForm.valid) {
            this.formHelper.markFormGroupTouched(this.signupForm);
            return;
        }
        const val = this.signupForm.value;
        const agreed = (val.agreed && val.agreed.length) ? true : false;
        this.authService.getUserData()
            .then(user_data => {
                this.authService.signup(val.name, val.email, val.password, agreed, user_data)
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
            })
            .catch(error => {
                console.error(error);
            });
    }
}
