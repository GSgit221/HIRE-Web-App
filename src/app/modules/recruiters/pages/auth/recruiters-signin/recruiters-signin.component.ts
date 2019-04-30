import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormHelperService } from './../../../../../services/form-helper.service';
import { SiteService } from './../../../../../services/site.service';
import { UtilitiesService } from './../../../../../services/utilities.service';
import * as fromStore from './../../../../../store';
import * as fromActions from './../../../../../store/actions';
import { AuthService } from './../../../../auth/auth.service';

@Component({
    selector: 'app-recruiters-signin',
    templateUrl: './recruiters-signin.component.html',
    styleUrls: ['./recruiters-signin.component.scss']
})
export class RecruitersSigninComponent implements OnInit {
    signinForm: FormGroup;
    msgs: any[] = [];
    contentLoading = false;
    constructor(
        private siteService: SiteService,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private authService: AuthService,
        private router: Router,
        private utilities: UtilitiesService,
        private store: Store<fromStore.State>
    ) {
        this.signinForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        const tenant = this.utilities.getTenant();
        if (tenant === 'app') {
            this.router.navigateByUrl('/signup');
        }
    }

    onSignIn(event) {
        event.preventDefault();
        this.msgs = [];
        if (!this.signinForm.valid) {
            this.formHelper.markFormGroupTouched(this.signinForm);
            return;
        }
        this.contentLoading = true;
        const val = this.signinForm.value;
        this.authService.signin(val.email, val.password).subscribe(
            (response) => {
                this.contentLoading = false;
                this.authService.setSession(response);
                this.router.navigateByUrl('/');
            },
            (response) => {
                this.contentLoading = false;
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
