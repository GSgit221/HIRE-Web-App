import { UtilitiesService } from './../../services/utilities.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/components/common/api';

import { environment } from '../../../environments/environment';
import * as fromUserActions from '../../actions/user/user.actions';
import { AuthService } from '../auth.service';
import { State } from '../../reducers';
import { FormHelperService } from '../../services/form-helper.service';

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
        private store: Store<State>,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService
    ) {
        // Check if app
        const tenant = this.utilities.getTenant();
        console.log(tenant);
        if (tenant === 'app') {
            this.router.navigateByUrl('/signup');
        }

        this.signinForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', Validators.required]
        });
        this.googleSigninLink = this.authService.getGoogleSigninLink();
    }

    ngOnInit() {
        const urlParts = decodeURIComponent(this.location.path()).replace('#', '&').split('&');
        const idTokenPart = urlParts.find(p => p.indexOf('id_token=') !== -1);
        const statePart = urlParts.find(p => p.indexOf('state=') !== -1);
        if (idTokenPart && statePart) {
            const idToken = idTokenPart.replace('id_token=', '');
            const tenant = statePart.replace('state=', '');
            console.log(tenant);
            this.onSignInWithGoogle(idToken, tenant);
        }
    }

    onSignInWithGoogle(idToken, tenant) {
        this.contentLoading = true;
        this.authService.getUserData()
            .then(userData => {
                this.authService.signInWithGoogle(idToken, userData, tenant)
                    .subscribe(response => {
                        this.contentLoading = false;
                        this.msgs = [];
                        this.authService.setSession(response, tenant);
                        const url = environment.appUrl.replace('subdomain', tenant);
                        console.log('REDIRECTING:', url);
                        window.location.href = url;
                    }, response => {
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                    });
            })
            .catch(error => console.log(error));
    }


    onSignIn(event) {
        event.preventDefault();
        if (!this.signinForm.valid) {
            this.formHelper.markFormGroupTouched(this.signinForm);
            return;
        }
        this.contentLoading = true;
        const val = this.signinForm.value;
        this.authService.signin(val.email, val.password)
            .subscribe(
                response => {
                    this.contentLoading = false;
                    this.msgs = [];
                    this.authService.setSession(response);
                    this.store.dispatch(new fromUserActions.GetAuthUser());
                    this.router.navigateByUrl('/');
                },
                response => {
                    this.contentLoading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                }
            );
    }
}
