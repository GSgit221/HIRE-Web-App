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
        if (!this.ssoForm.valid) {
            this.formHelper.markFormGroupTouched(this.ssoForm);
            return;
        }
        this.contentLoading = true;
        const val = this.ssoForm.value;
        this.authService.ssoSignIn(val.company).subscribe(
            (response: any) => {
                this.contentLoading = false;
                console.log('response here', response);
                //window.location.href = 'https://www.google.com';
                //this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
            },
            (response) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
