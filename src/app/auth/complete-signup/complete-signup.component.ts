import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { environment } from '../../../environments/environment';
import { JobService } from '../../services/job.service';
import { UtilitiesService } from '../../services/utilities.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-complete-signup',
    templateUrl: './complete-signup.component.html',
    styleUrls: ['./complete-signup.component.scss']
})
export class CompleteSignupComponent implements OnInit {
    websiteForm: FormGroup;
    companyForm: FormGroup;
    countryTypeOptions: SelectItem[] = [];
    employeesTypeOptions: SelectItem[] = [];
    websiteReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    companyNameReg = '[a-zA-Z0-9 ]+';
    contentLoading = true;
    step = '';
    googleSigninLink = '';
    msgs: Message[] = [];
    token = '';
    tenant = '';

    constructor(
        private fb: FormBuilder,
        private jobService: JobService,
        private utilities: UtilitiesService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Check if app
        // const tenant = this.utilities.getTenant();
        // console.log(tenant);
        this.token = this.route.snapshot.queryParamMap.get('token');
        this.tenant = this.route.snapshot.queryParamMap.get('tenantId');
        this.onSignUpWithGoogle(this.token, this.tenant);

        // OPTIONS
        this.utilities.getCountries().subscribe((countries: Array<{ name: string; code: string }>) => {
            countries
                .sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
                .forEach((c) => {
                    this.countryTypeOptions.push({ label: c.name, value: c.code });
                });
        });
        this.employeesTypeOptions = [
            { label: '1 - 10', value: '1-10' },
            { label: '11 - 50', value: '11-50' },
            { label: '51 - 250', value: '51-250' },
            { label: '251 - 1K', value: '251-1K' },
            { label: '1K - 5K', value: '1K-5K' },
            { label: '5K - 10K', value: '5K-10K' },
            { label: '10K - 50K', value: '10K-50K' },
            { label: '50K - 100K', value: '50K-100K' },
            { label: '100K +', value: '100K+' }
        ];
        this.initForms();
    }

    ngOnInit() {}

    onSignUpWithGoogle(idToken, tenant) {
        this.contentLoading = true;
        this.authService
            .getUserData()
            .then((userData) => {
                this.authService.signUpWithGoogle(idToken, userData, tenant).subscribe(
                    (response) => {
                        this.contentLoading = false;
                        console.log(response);
                        this.msgs = [];
                        this.authService.setSession(response, tenant);
                        const url = environment.appUrl.replace('subdomain', tenant);
                        console.log('REDIRECTING:', url);
                        window.location.href = url;
                    },
                    (response) => {
                        this.contentLoading = false;
                        if (response.error.error === 'Company data not found') {
                            this.step = 'second';
                        } else {
                            console.log(response);
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                        }
                    }
                );
            })
            .catch((error) => console.log(error));
    }

    onKeyupEmail(event) {
        event.target.value = event.target.value.toLowerCase();
    }

    initForms() {
        this.websiteForm = this.fb.group({
            url: ['', [Validators.required, Validators.pattern(this.websiteReg)]]
        });
        this.companyForm = this.fb.group({
            company_website_url: ['', [Validators.required, Validators.pattern(this.websiteReg)]],
            company_name: ['', [Validators.required]],
            agreed: [false, Validators.requiredTrue],
            country_code: ['', Validators.required],
            employees: ['', Validators.required],
            country_name: ['']
        });
    }

    onChangeCountry(event) {
        const countryLabel = this.countryTypeOptions.find((country) => country.value === event.value);
        this.companyForm.patchValue({
            country_name: countryLabel.label
        });
    }

    onFinishSecondStep() {
        this.contentLoading = true;
        this.step = 'third';

        this.jobService.getDataCompany(this.websiteForm.value.url).subscribe((data: any) => {
            this.contentLoading = false;
            let employees = data.metrics.employeesRange;
            if (employees) {
                employees = employees.replace(/ /g, '');
            }
            this.companyForm = this.fb.group({
                company_website_url: [data.domain, [Validators.required, Validators.pattern(this.websiteReg)]],
                company_name: [data.name, [Validators.required]],
                country_code: [data.geo.countryCode, Validators.required],
                employees: [employees, Validators.required],
                agreed: [false, Validators.requiredTrue],
                country_name: [data.geo.country]
            });
        });
    }

    onFinishThirdStep() {
        this.contentLoading = true;
        const data = { ...this.companyForm.value };
        this.authService
            .getUserData()
            .then((geo_data) => {
                data.geo_data = geo_data;
                this.authService.completeSignUpWithGoogle(this.token, data, this.tenant).subscribe(
                    (response: any) => {
                        this.contentLoading = false;
                        this.msgs = [];
                        this.authService.setSession(response, response.tenant_id);
                        const url = environment.appUrl.replace('subdomain', response.tenant_id);
                        console.log('REDIRECTING:', url);
                        window.location.href = url;
                    },
                    (response) => {
                        this.contentLoading = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                    }
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
