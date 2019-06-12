import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

import { FormHelperService } from '../../../core/services/form-helper.service';
import { AuthService } from '../auth.service';
import { UtilitiesService } from './../../../core/services/utilities.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    msgs: Message[] = [];
    resetSuccess = false;
    email: any;
    contentLoading = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService
    ) {
        // Check if app
        const tenant = this.utilities.getTenant();
        console.log(tenant);
        if (tenant === 'app') {
            this.router.navigateByUrl('/auth/signup');
        }

        this.resetForm = this.fb.group({
            email: ['', Validators.required]
        });
    }

    ngOnInit() {}

    onReset(event) {
        console.log('event');
        this.contentLoading = true;
        event.preventDefault();
        if (!this.resetForm.valid) {
            this.formHelper.markFormGroupTouched(this.resetForm);
            return;
        }
        this.authService.resetPassword(this.resetForm.value.email).subscribe(
            (response) => {
                this.contentLoading = false;
                this.email = this.resetForm.value.email;
                this.msgs = [];
                this.resetSuccess = true;
                setTimeout(() => this.router.navigateByUrl('/auth/signin'), 5000);
            },
            (response) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
