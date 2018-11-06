import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { JobService } from '../../services/job.service';
import { UtilitiesService } from '../../services/utilities.service';
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


    constructor(
        private fb: FormBuilder,
        private jobService: JobService,
        private utilities: UtilitiesService,
        private authService: AuthService,
        private router: Router
    ) {
        // Check if app
        const tenant = this.utilities.getTenant();
        console.log(tenant);



        // Google link
        this.googleSigninLink = this.authService.getGoogleSigninLink();
        // OPTIONS
        this.utilities.getCountries()
            .subscribe((countries: { name: string, code: string }[]) => {
                countries.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                }).forEach(c => {
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

    ngOnInit() {

    }

    initForms() {
        this.credentialsForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})$')]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
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
        const countryLabel = this.countryTypeOptions.find(country => country.value === event.value);
        this.companyForm.patchValue({
            country_name: countryLabel.label
        });
    }

    onFinishFirstStep() {
        this.contentLoading = true;
        this.msgs = [];
        this.authService.checkUserExists(this.credentialsForm.get('email').value)
            .subscribe((response: any) => {
                this.contentLoading = false;
                if (response.user_exists) {
                    this.msgs.push({ severity: 'error', detail: 'User with this email is already registered. Please sign in.' });
                    return false;
                }
                this.msgs = [];
                this.step = 'second';
            });
    }


    onFinishSecondStep() {
        this.contentLoading = true;
        this.step = 'third';

        this.jobService.getDataCompany(this.websiteForm.value.url).subscribe((data: any) => {
            console.log(data);
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

        });
    }

    onFinishThirdStep() {
        const data = Object.assign({}, this.companyForm.value, this.credentialsForm.value);
        this.authService.getUserData()
            .then(geo_data => {
                data.geo_data = geo_data;
                this.authService.signup(data)
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
            })
            .catch(error => {
                console.error(error);
            });
    }

}
