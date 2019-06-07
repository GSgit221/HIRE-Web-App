import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from '../../../../../../../core/services/form-helper.service';
import { SiteService } from '../../../../../../../core/services/site.service';
import { UtilitiesService } from '../../../../../../../core/services/utilities.service';
import { AuthService } from '../../../../../../../modules/auth/auth.service';

@Component({
    selector: 'app-recruiters-reset-password',
    templateUrl: './recruiters-reset-password.component.html',
    styleUrls: ['./recruiters-reset-password.component.scss']
})
export class RecruitersResetPasswordComponent implements OnInit {
    passwordResetLinkSent = false;
    siteUrl = '';
    resetForm: FormGroup;
    msgs: any[] = [];
    contentLoading = false;
    constructor(
        private siteService: SiteService,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private authService: AuthService,
        private router: Router,
        private utilities: UtilitiesService
    ) {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
        });
        this.siteUrl = window.location.hostname;
    }

    ngOnInit() {}

    onReset(event) {
        event.preventDefault();
        this.msgs = [];
        if (!this.resetForm.valid) {
            this.formHelper.markFormGroupTouched(this.resetForm);
            return;
        }
        this.contentLoading = true;
        const val = this.resetForm.value;
        this.authService.resetPassword(val.email).subscribe(
            (response) => {
                this.contentLoading = false;
                console.log(response);
                // this.authService.setSession(response);
                this.passwordResetLinkSent = true;
                setTimeout(() => {
                    this.router.navigateByUrl('/auth/signin');
                }, 10000);
            },
            (response) => {
                this.contentLoading = false;
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
