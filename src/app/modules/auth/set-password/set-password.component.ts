import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

import { FormHelperService } from './../../../core/services/form-helper.service';
import { UtilitiesService } from './../../../core/services/utilities.service';
import { PasswordValidation } from './../../../core/validators/password.validator';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-set-password',
    templateUrl: './set-password.component.html',
    styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
    token: string;
    invitation_code: string;
    setPasswordForm: FormGroup;
    msgs: Message[] = [];
    contentLoading = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService
    ) {
        // Check if app
        const tenant = this.utilities.getTenant();
        if (tenant === 'app') {
            this.router.navigateByUrl('/auth/signup');
        }

        this.setPasswordForm = this.fb.group(
            {
                password: ['', Validators.required],
                confirm_password: ['', Validators.required]
            },
            {
                validator: PasswordValidation.MatchPassword
            }
        );
    }

    ngOnInit() {
        this.token = this.route.snapshot.queryParamMap.get('token');
        this.invitation_code = this.route.snapshot.queryParamMap.get('invitation_code');
    }

    onSubmit(event) {
        this.contentLoading = true;
        event.preventDefault();
        if (!this.setPasswordForm.valid) {
            this.formHelper.markFormGroupTouched(this.setPasswordForm);
            return;
        }
        const val = this.setPasswordForm.value;
        this.authService.setPassword(val.password, this.token, this.invitation_code).subscribe(
            (response) => {
                this.contentLoading = false;
                this.msgs = [];
                this.authService.setSession(response);
                this.router.navigateByUrl('/');
            },
            (response) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
