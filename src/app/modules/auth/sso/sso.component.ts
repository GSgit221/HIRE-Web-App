import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from '@app/core/services/form-helper.service';
import { Message } from 'primeng/components/common/api';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-sso',
    templateUrl: './sso.component.html',
    styleUrls: ['./sso.component.scss']
})
export class SSOComponent implements OnInit {
    ssoForm: FormGroup;
    contentLoading = false;
    msgs: Message[] = [];

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private authService: AuthService,
        private router: Router
    ) {
        this.ssoForm = this.fb.group({
            company: ['', Validators.required]
        });
    }
    ngOnInit() {}

    onssoSignIn(event) {
        event.preventDefault();
        // if (!this.ssoForm.valid) {
        //     this.formHelper.markFormGroupTouched(this.ssoForm);
        //     return;
        // }
        this.authService.loading = true;
        // const val = this.ssoForm.value;
        this.authService.ssoSignIn().subscribe(
            (response: any) => {
                this.authService.loading = false;
                console.log('response here', response);
                window.location.href = response.login_url;
            },
            (response) => {
                this.authService.loading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
