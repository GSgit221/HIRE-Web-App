import { UtilitiesService } from 'src/app/services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

import { FormHelperService } from './../../services/form-helper.service';
import { PasswordValidation } from './../../validators/password.validator';
import { AuthService } from './../auth.service';

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
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private formHelper: FormHelperService,
        private utilities: UtilitiesService
    ) {
        // Check if app
        const tenant = this.utilities.getTenant();
        console.log(tenant);
        if (tenant === 'app') {
            this.router.navigateByUrl('/signup');
        }


        this.setPasswordForm = this.fb.group({
            password: ['', Validators.required],
            confirm_password: ['', Validators.required],
            agreed: [false, Validators.requiredTrue]
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
            this.formHelper.markFormGroupTouched(this.setPasswordForm);
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
}
