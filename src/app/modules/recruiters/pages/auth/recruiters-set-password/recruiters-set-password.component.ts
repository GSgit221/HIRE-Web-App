import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelperService } from './../../../../../services/form-helper.service';
import { PasswordValidation } from './../../../../../validators/password.validator';
import { AuthService } from './../../../../auth/auth.service';

@Component({
    selector: 'app-recruiters-set-password',
    templateUrl: './recruiters-set-password.component.html',
    styleUrls: ['./recruiters-set-password.component.scss']
})
export class RecruitersSetPasswordComponent implements OnInit {
    token: string;
    invitation_code: string;
    setPasswordForm: FormGroup;
    msgs: any[] = [];
    contentLoading = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private formHelper: FormHelperService
    ) {
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
        event.preventDefault();
        if (!this.setPasswordForm.valid) {
            this.formHelper.markFormGroupTouched(this.setPasswordForm);
            return;
        }
        const val = this.setPasswordForm.value;
        this.authService.setPassword(val.password, this.token, this.invitation_code).subscribe(
            (response) => {
                this.msgs = [];
                this.authService.setSession(response);
                this.router.navigateByUrl('/');
            },
            (response) => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
