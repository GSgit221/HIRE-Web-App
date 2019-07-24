import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelperService } from '@app/core/services/form-helper.service';
import { Message } from 'primeng/components/common/api';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { UtilitiesService } from './../../../core/services/utilities.service';

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
        private router: Router,
        private route: ActivatedRoute,
        private utilities: UtilitiesService
    ) {
        this.ssoForm = this.fb.group({
            company: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.route.queryParams.subscribe((queryParams) => {
            if (queryParams.error && queryParams.error.length) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: queryParams.error || 'Error' });
            }
            console.log(queryParams);
            if (queryParams.tenant_id && queryParams.access_token && queryParams.user_hash) {
                const response = {
                    tenant_id: queryParams.tenant_id,
                    access_token: queryParams.access_token,
                    user_hash: queryParams.user_hash
                };
                this.authService.setSession(response);
                this.utilities.setTenant(response.tenant_id);
                this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
            }
        });
    }

    onssoSignIn(event) {
        event.preventDefault();
        if (!this.ssoForm.valid) {
            this.formHelper.markFormGroupTouched(this.ssoForm);
            return;
        }
        this.authService.loading = true;
        const val = this.ssoForm.value;
        this.authService.ssoSignIn(val.company).subscribe(
            (response: any) => {
                this.authService.loading = false;
                console.log('response here', response);
                //window.location.href = 'https://www.google.com';
                //this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
            },
            (response) => {
                this.authService.loading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            }
        );
    }
}
