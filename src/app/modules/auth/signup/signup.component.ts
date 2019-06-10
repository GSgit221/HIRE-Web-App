import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import * as fromStore from './../../../store';

import { environment } from '@env/environment';
import { JobService } from '../../../core/services/job.service';
import { UtilitiesService } from '../../../core/services/utilities.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    credentialsForm: FormGroup;
    websiteForm: FormGroup;
    companyForm: FormGroup;
    countryTypeOptions: SelectItem[] = [];
    employeesTypeOptions: SelectItem[] = [];
    step = 'first';
    websiteReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    companyNameReg = '[a-zA-Z0-9 ]+';
    contentLoading = false;
    googleSigninLink = '';
    msgs: Message[] = [];
    authResponse: any;

    constructor(
        private fb: FormBuilder,
        private jobService: JobService,
        private utilities: UtilitiesService,
        private authService: AuthService,
        private router: Router,
        private store: Store<fromStore.State>
    ) {
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

    onGoogleSignup() {
        this.contentLoading = true;
        this.authService
            .onGoogleSignin()
            .then((authResponse) => {
                this.authResponse = authResponse;
                console.log(authResponse);
                this.authService.checkUserExists(authResponse.email).subscribe(
                    (response: any) => {
                        if (response.user_exists) {
                            this.contentLoading = false;
                            this.msgs = [];
                            this.msgs.push({
                                severity: 'error',
                                detail: 'User with this email is already registered. Please sign in.'
                            });
                            return;
                        }
                        this.authService.getCompanyByEmail(this.authResponse.email).subscribe((data: any) => {
                            this.contentLoading = false;
                            if (data) {
                                this.step = 'third';
                                let employees = data.metrics.employeesRange;
                                if (employees) {
                                    employees = employees.replace(/ /g, '');
                                }
                                this.companyForm = this.fb.group({
                                    company_website_url: [
                                        data.domain,
                                        [Validators.required, Validators.pattern(this.websiteReg)]
                                    ],
                                    company_name: [
                                        data.name,
                                        [Validators.required, Validators.pattern(this.companyNameReg)]
                                    ],
                                    country_code: [data.geo.countryCode, Validators.required],
                                    employees: [employees, Validators.required],
                                    agreed: [false, Validators.requiredTrue],
                                    country_name: [data.geo.country]
                                });
                                return false;
                            } else {
                                this.msgs = [];
                                this.step = 'second';
                            }
                        });
                    },
                    (errorResponse) => {
                        this.authResponse = null;
                        console.error(errorResponse);
                    }
                );
            })
            .catch((errorResponse) => {
                this.contentLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: errorResponse.error || 'Error' });
                this.authResponse = null;
            });
    }

    onKeyupEmail(event) {
        event.target.value = event.target.value.toLowerCase();
    }

    initForms() {
        this.credentialsForm = this.fb.group({
            // name: [
            //     '',
            //     [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]
            // ],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
            // password: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.websiteForm = this.fb.group({
            url: ['', [Validators.required, Validators.pattern(this.websiteReg)]]
        });
        this.companyForm = this.fb.group({
            company_website_url: ['', [Validators.required, Validators.pattern(this.websiteReg)]],
            company_name: ['', [Validators.required, Validators.pattern(this.companyNameReg)]],
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

    onFinishFirstStep() {
        console.log(this.credentialsForm.get('email').value);
        // this.step = 'second';
        this.authResponse = null;
        this.contentLoading = true;
        this.msgs = [];
        this.authService.checkUserExists(this.credentialsForm.get('email').value).subscribe((response: any) => {
            if (response.user_exists) {
                this.contentLoading = false;
                this.msgs.push({
                    severity: 'error',
                    detail: 'User with this email is already registered. Please sign in.'
                });
                return false;
            }
            // this.authService.usersignup(this.credentialsForm.get('email').value).subscribe((data: any) => {
            //     this.contentLoading = false;
            //     console.log('data',data);
            // });
            else {
                this.step = 'second';
            }
            // this.authService.getCompanyByEmail(this.credentialsForm.get('email').value).subscribe((data: any) => {
            //     this.contentLoading = false;
            //     if (data) {
            //         this.step = 'third';
            //         let employees = data.metrics.employeesRange;
            //         if (employees) {
            //             employees = employees.replace(/ /g, '');
            //         }
            //         this.companyForm = this.fb.group({
            //             company_website_url: [data.domain, [Validators.required, Validators.pattern(this.websiteReg)]],
            //             company_name: [data.name, [Validators.required, Validators.pattern(this.companyNameReg)]],
            //             country_code: [data.geo.countryCode, Validators.required],
            //             employees: [employees, Validators.required],
            //             agreed: [false, Validators.requiredTrue],
            //             country_name: [data.geo.country]
            //         });
            //         return false;
            //     } else {
            //         this.msgs = [];
            //         this.step = 'second';
            //     }
            // });
        });
    }

    onFinishSecondStep() {
        this.contentLoading = true;
        this.step = 'third';

        this.jobService.getDataCompany(this.websiteForm.value.url).subscribe(
            (data: any) => {
                this.contentLoading = false;
                let employees = data.metrics.employeesRange;
                if (employees) {
                    employees = employees.replace(/ /g, '');
                }
                this.companyForm = this.fb.group({
                    company_website_url: [data.domain, [Validators.required, Validators.pattern(this.websiteReg)]],
                    company_name: [data.name, [Validators.required, Validators.pattern(this.companyNameReg)]],
                    country_code: [data.geo.countryCode, Validators.required],
                    employees: [employees, Validators.required],
                    agreed: [false, Validators.requiredTrue],
                    country_name: [data.geo.country]
                });
            },
            (error) => {
                this.contentLoading = false;
                console.error('error company not found');
                this.companyForm.get('company_website_url').patchValue(this.websiteForm.value.url);
            }
        );
    }

    onFinishThirdStep() {
        this.contentLoading = true;
        const data = { ...this.companyForm.value, ...this.credentialsForm.value };
        this.authService
            .getUserData()
            .then((geo_data) => {
                data.geo_data = geo_data;
                if (this.authResponse) {
                    data.authData = this.authResponse;
                    this.authService.signUpWithGoogle(data).subscribe(
                        (response: any) => {
                            this.contentLoading = false;
                            this.msgs = [];
                            this.authService.setSession(response);
                            this.utilities.setTenant(response.tenant_id);
                            this.store.dispatch(new fromStore.LoadUser());
                            this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
                        },
                        (response) => {
                            this.contentLoading = false;
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                        }
                    );
                } else {
                    this.authService.signup(data).subscribe(
                        (response: any) => {
                            this.contentLoading = false;
                            this.msgs = [];
                            this.authService.setSession(response);
                            this.utilities.setTenant(response.tenant_id);
                            this.store.dispatch(new fromStore.LoadUser());
                            this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
                        },
                        (response) => {
                            this.contentLoading = false;
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                        }
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
