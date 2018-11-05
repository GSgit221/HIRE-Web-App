import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {JobService} from '../../services/job.service';
import {UtilitiesService} from '../../services/utilities.service';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-tenats-signup',
    templateUrl: './tenats-signup.component.html',
    styleUrls: ['./tenats-signup.component.scss']
})
export class TenatsSignupComponent implements OnInit {
    nameForm: FormGroup;
    companyWebsite: FormGroup;
    companyData: FormGroup;
    countryTypeOptions: SelectItem[];
    employeesTypeOptions: SelectItem[];
    step = 'first';
    reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    regCompany = '[a-zA-Z0-9 ]+';
    contentLoading = false;
    selectedCountry;
    

    constructor(private fb: FormBuilder, private jobService: JobService, private utilities: UtilitiesService, private authService: AuthService ) {
        this.nameForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})$')]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        
        this.companyWebsite = this.fb.group({
            url: ['', [Validators.required, Validators.pattern(this.reg)]]
        });
        this.companyData = this.fb.group({
            company_website_url: ['', [Validators.required, Validators.pattern(this.reg)]],
            company_name: ['', [Validators.required, Validators.pattern(this.regCompany)]],
            agreed: ['', Validators.required],
            country_code: ['', Validators.required],
            employees: ['', Validators.required],
            country_name: ['']
        });
        this.employeesTypeOptions = [
            {label: '1-10', value: '1-10'},
            {label: '11-50', value: '11-50'},
            {label: '51-250', value: '51-250'},
            {label: '251 - 1K', value: '251 - 1K'},
            {label: '1K - 5K', value: '1K - 5K'},
            {label: '5K - 10K', value: '5K - 10K' },
            {label: '10K-50K', value: '10K-50K'},
            {label: '50K - 100K', value: '50K - 100K' },
            {label: '100K +', value: '100K +' }
        ];
        this.countryTypeOptions = [
            {label: 'Afghanistan', value: 'AF'},
            {label: 'land Islands', value: 'AX'},
            {label: 'Albania', value: 'AL'},
            {label: 'Algeria', value: 'DZ'},
            {label: 'American Samoa', value: 'AS'},
            {label: 'AndorrA', value: 'AD'},
            {label: 'Angola', value: 'AO'},
            {label: 'Anguilla', value: 'AI'},
            {label: 'Antarctica', value: 'AQ'},
            {label: 'Antigua and Barbuda', value: 'AG'},
            {label: 'Argentina', value: 'AR'},
            {label: 'Armenia', value: 'AM'},
            {label: 'Aruba', value: 'AW'},
            {label: 'Australia', value: 'AU'},
            {label: 'Austria', value: 'AT'},
            {label: 'Azerbaijan', value: 'AZ'},
            {label: 'Bahamas', value: 'BS'},
            {label: 'Bahrain', value: 'BH'},
            {label: 'Bangladesh', value: 'BD'},
            {label: 'Barbados', value: 'BB'},
            {label: 'Belarus', value: 'BY'},
            {label: 'Belgium', value: 'BE'},
            {label: 'Belize', value: 'BZ'},
            {label: 'Benin', value: 'BJ'},
            {label: 'Bermuda', value: 'BM'},
            {label: 'Bhutan', value: 'BT'},
            {label: 'Bolivia', value: 'BO'},
            {label: 'Bosnia and Herzegovina', value: 'BA'},
            {label: 'Botswana', value: 'BW'},
            {label: 'Bouvet Island', value: 'BV'},
            {label: 'Brazil', value: 'BR'},
            {label: 'British Indian Ocean Territory', value: 'IO'},
            {label: 'Brunei Darussalam', value: 'BN'},
            {label: 'Bulgaria', value: 'BG'},
            {label: 'Burkina Faso', value: 'BF'},
            {label: 'Burundi', value: 'BI'},
            {label: 'Cambodia', value: 'KH'},
            {label: 'Cameroon', value: 'CM'},
            {label: 'Canada', value: 'CA'},
            {label: 'Cape Verde', value: 'CV'},
            {label: 'Cayman Islands', value: 'KY'},
            {label: 'Central African Republic', value: 'CF'},
            {label: 'Chad', value: 'TD'},
            {label: 'Chile', value: 'CL'},
            {label: 'China', value: 'CN'},
            {label: 'Christmas Island', value: 'CX'},
            {label: 'Cocos (Keeling) Islands', value: 'CC'},
            {label: 'Colombia', value: 'CO'},
            {label: 'Comoros', value: 'KM'},
            {label: 'Congo', value: 'CG'},
            {label: 'Congo, The Democratic Republic of the', value: 'CD'},
            {label: 'Cook Islands', value: 'CK'},
            {label: 'Costa Rica', value: 'CR'},
            {label: 'Cote D\'Ivoire', value: 'CI'},
            {label: 'Croatia', value: 'HR'},
            {label: 'Cuba', value: 'CU'},
            {label: 'Cyprus', value: 'CY'},
            {label: 'Czech Republic', value: 'CZ'},
            {label: 'Denmark', value: 'DK'},
            {label: 'Djibouti', value: 'DJ'},
            {label: 'Dominica', value: 'DM'},
            {label: 'Dominican Republic', value: 'O'},
            {label: 'Ecuador', value: 'EC'},
            {label: 'Egypt', value: 'EG'},
            {label: 'El Salvador', value: 'SV'},
            {label: 'Equatorial Guinea', value: 'GQ'},
            {label: 'Eritrea', value: 'ER'},
            {label: 'Estonia', value: 'EE'},
            {label: 'Ethiopia', value: 'ET'},
            {label: 'Falkland Islands (Malvinas)', value: 'FK'},
            {label: 'Faroe Islands', value: 'FO'},
            {label: 'Fiji', value: 'FJ'},
            {label: 'Finland', value: 'FI'},
            {label: 'France', value: 'FR'},
            {label: 'French Guiana', value: 'GF'},
            {label: 'French Polynesia', value: 'PF'},
            {label: 'French Southern Territories', value: 'TF'},
            {label: 'Gabon', value: 'GA'},
            {label: 'Gambia', value: 'GM'},
            {label: 'Georgia', value: 'GE'},
            {label: 'Germany', value: 'DE'},
            {label: 'Ghana', value: 'GH'},
            {label: 'Gibraltar', value: 'GI'},
            {label: 'Greece', value: 'GR'},
            {label: 'Greenland', value: 'GL'},
            {label: 'Grenada', value: 'GD'},
            {label: 'Guadeloupe', value: 'GP'},
            {label: 'Guam', value: 'GU'},
            {label: 'Guatemala', value: 'GT'},
            {label: 'Guernsey', value: 'GG'},
            {label: 'Guinea', value: 'GN'},
            {label: 'Guinea-Bissau', value: 'GW'},
            {label: 'Guyana', value: 'GY'},
            {label: 'Haiti', value: 'HT'},
            {label: 'Heard Island and Mcdonald Islands', value: 'HM'},
            {label: 'Holy See (Vatican City State)', value: 'VA'},
            {label: 'Honduras', value: 'HN'},
            {label: 'Hong Kong', value: 'HK'},
            {label: 'Hungary', value: 'HU'},
            {label: 'Iceland', value: 'IS'},
            {label: 'India', value: 'IN'},
            {label: 'Indonesia', value: 'ID'},
            {label: 'Iran, Islamic Republic Of', value: 'IR'},
            {label: 'Iraq', value: 'IQ'},
            {label: 'Ireland', value: 'IE'},
            {label: 'Isle of Man', value: 'IM'},
            {label: 'Israel', value: 'IL'},
            {label: 'Italy', value: 'IT'},
            {label: 'Jamaica', value: 'JM'},
            {label: 'Japan', value: 'JP'},
            {label: 'Jersey', value: 'JE'},
            {label: 'Jordan', value: 'JO'},
            {label: 'Kazakhstan', value: 'KZ'},
            {label: 'Kenya', value: 'KE'},
            {label: 'Kiribati', value: 'KI'},
            {label: 'Korea, Democratic People\'S Republic of', value: 'KP'},
            {label: 'Korea, Republic of', value: 'KR'},
            {label: 'Kuwait', value: 'KW'},
            {label: 'Kyrgyzstan', value: 'KG'},
            { label: 'Lao People\'S Democratic Republic', value: 'LA'},
            {label: 'Latvia', value: 'LV'},
            {label: 'Lebanon', value: 'LB'},
            {label: 'Lesotho', value: 'LS'},
            {label: 'Liberia', value: 'LR'},
            {label: 'Libyan Arab Jamahiriya', value: 'LY'},
            {label: 'Liechtenstein', value: 'LI'},
            {label: 'Lithuania', value: 'LT'},
            {label: 'Luxembourg', value: 'LU'},
            {label: 'Macao', value: 'MO'},
            {label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK'},
            {label: 'Madagascar', value: 'MG'},
            {label: 'Malawi', value: 'MW'},
            {label: 'Malaysia', value: 'MY'},
            {label: 'Maldives', value: 'MV'},
            {label: 'Mali', value: 'ML'},
            {label: 'Malta', value: 'MT'},
            {label: 'Marshall Islands', value: 'MH'},
            {label: 'Martinique', value: 'MQ'},
            {label: 'Mauritania', value: 'MR'},
            {label: 'Mauritius', value: 'MU'},
            {label: 'Mayotte', value: 'YT'},
            {label: 'Mexico', value: 'MX'},
            {label: 'Micronesia, Federated States of', value: 'FM'},
            {label: 'Moldova, Republic of', value: 'MD'},
            {label: 'Monaco', value: 'MC'},
            {label: 'Mongolia', value: 'MN'},
            {label: 'Montenegro', value: 'ME'},
            {label: 'Montserrat', value: 'MS'},
            {label: 'Morocco', value: 'MA'},
            {label: 'Mozambique', value: 'MZ'},
            {label: 'Myanmar', value: 'MM'},
            {label: 'Namibia', value: 'NA'},
            {label: 'Nauru', value: 'NR'},
            {label: 'Nepal', value: 'NP'},
            {label: 'Netherlands', value: 'NL'},
            {label: 'Netherlands Antilles', value: 'AN'},
            {label: 'New Caledonia', value: 'NC'},
            {label: 'New Zealand', value: 'NZ'},
            {label: 'Nicaragua', value: 'NI'},
            {label: 'Niger"', value: 'E'},
            {label: 'Nigeria', value: 'NG'},
            {label: 'Niue', value: 'NU'},
            {label: 'Norfolk Island', value: 'NF'},
            {label: 'Northern Mariana Islands', value: 'MP'},
            {label: 'Norway', value: 'NO'},
            {label: 'Oman', value: 'OM'},
            {label: 'Pakistan', value: 'PK'},
            {label: 'Palau', value: 'PW'},
            {label: 'Palestinian Territory, Occupied', value: 'PS'},
            {label: 'Panama', value: 'PA'},
            {label: 'Papua New Guinea', value: 'PG'},
            {label: 'Paraguay', value: 'PY'},
            {label: 'Peru', value: 'PE'},
            {label: 'Philippines', value: 'PH'},
            {label: 'Pitcairn', value: 'PN'},
            {label: 'Poland', value: 'PL'},
            {label: 'Portugal', value: 'PT'},
            {label: 'Puerto Rico', value: 'PR'},
            {label: 'Qatar', value: 'QA'},
            {label: 'Reunion', value: 'RE'},
            {label: 'Romania', value: 'RO'},
            {label: 'Russian Federation', value: 'RU'},
            {label: 'RWANDA', value: 'RW'},
            {label: 'Saint Helena', value: 'SH'},
            {label: 'Saint Kitts and Nevis', value: 'KN'},
            {label: 'Saint Lucia', value: 'LC'},
            {label: 'Saint Pierre and Miquelon', value: 'PM'},
            {label: 'Saint Vincent and the Grenadines', value: 'VC'},
            {label: 'Samoa', value: 'WS'},
            {label: 'San Marino', value: 'SM'},
            {label: 'Sao Tome and Princip', value: 'ST'},
            {label: 'Saudi Arabia', value: 'SA'},
            {label: 'Senegal', value: 'SN'},
            {label: 'Serbia', value: 'RS'},
            {label: 'Seychelles', value: 'SC'},
            {label: 'Sierra Leone', value: 'SL'},
            {label: 'Singapore', value: 'SG'},
            {label: 'Slovakia', value: 'SK'},
            {label: 'Slovenia', value: 'SI'},
            {label: 'Solomon Islands', value: 'SB'},
            {label: 'Somalia', value: 'SO'},
            {label: 'South Africa', value: 'ZA'},
            {label: 'South Georgia and the South Sandwich Islands', value: 'GS'},
            {label: 'Spain', value: 'ES'},
            {label: 'Sri Lanka', value: 'LK'},
            {label: 'Sudan', value: 'SD'},
            {label: 'Suriname', value: 'SR'},
            {label: 'Svalbard and Jan Mayen', value: 'SJ'},
            {label: 'Swaziland', value: 'SZ'},
            {label: 'Sweden', value: 'SE'},
            {label: 'Switzerland', value: 'CH'},
            {label: 'Syrian Arab Republic', value: 'SY'},
            {label: 'Taiwan, Province of China', value: 'TW'},
            {label: 'Tajikistan', value: 'TJ'},
            {label: 'Tanzania, United Republic of', value: 'TZ'},
            {label: 'Thailand', value: 'TH'},
            {label: 'Timor-Leste', value: 'TL'},
            {label: 'Togo', value: 'TG'},
            {label: 'Tokelau', value: 'TK'},
            {label: 'Tonga', value: 'TO'},
            {label: 'Trinidad and Tobago', value: 'TT'},
            {label: 'Tunisia', value: 'TN'},
            {label: 'Turkey', value: 'TR'},
            {label: 'Turkmenistan', value: 'TM'},
            {label: 'Turks and Caicos Islands', value: 'TC'},
            {label: 'Tuvalu', value: 'TV'},
            {label: 'Uganda', value: 'UG'},
            {label: 'Ukraine', value: 'UA'},
            {label: 'United Arab Emirates', value: 'AE'},
            {label: 'United Kingdom', value: 'GB'},
            {label: 'United States', value: 'US'},
            {label: 'United States Minor Outlying Islands', value: 'M'},
            {label: 'Uruguay', value: 'UY'},
            {label: 'Uzbekistan', value: 'UZ'},
            {label: 'Vanuatu', value: 'VU'},
            {label: 'Venezuela', value: 'VE'},
            {label: 'Viet Nam', value: 'VN'},
            {label: 'Virgin Islands, British', value: 'VG'},
            {label: 'Virgin Islands, U.S.', value: 'VI'},
            {label: 'Wallis and Futuna', value: 'WF'},
            {label: 'Western Sahara', value: 'EH'},
            {label: 'Yemen', value: 'YE'},
            {label: 'Zambia', value: 'ZM'},
            {label: 'Zimbabwe', value: 'ZW'}
        ];
    }

    ngOnInit() {
    
    }
    onChangeCountry(event) {
        let countryLabel = this.countryTypeOptions.find(country => country.value === event.value);
        this.companyData.patchValue({
            country_name: countryLabel.label
        });
    }

    onSecondStep() {
        this.step = 'second';
    }

    onThirdStep() {
        this.contentLoading = true;
        this.step = 'third';
        
        this.jobService.getDataCompany(this.companyWebsite.value.url).subscribe((data: any) => {
            console.log(data);
            this.contentLoading = false;
            this.companyData = this.fb.group({
                company_website_url: [data.domain, [Validators.required, Validators.pattern(this.reg)]],
                company_name: [data.name, [Validators.required, Validators.pattern(this.regCompany)]],
                country_code: [data.geo.countryCode, Validators.required],
                employees: [data.metrics.employeesRange, Validators.required],
                agreed: ['', Validators.required],
                country_name: [data.geo.country]
            });

        });
    }
    onSignUpWithGoogle() {

    }
    onFinishRegistration() {
        this.authService.getUserData().then((user_data) => {
            const fullForm = Object.assign({ source: 'jobs', tenant: this.utilities.getTenant(), geo_data: user_data }, this.companyData.value, this.nameForm.value)
            console.log(fullForm);
        });
    }

}
