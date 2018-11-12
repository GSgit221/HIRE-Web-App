import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
    selector: 'app-billing-details',
    templateUrl: './billing-details.component.html',
    styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {

    billingDetailsForm: FormGroup;
    countryOptions: SelectItem[];
    creditCardDetailsForm: FormGroup;
    date;

    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.billingDetailsForm = this.fb.group({
            companyName: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            country: ['']
        });
        this.creditCardDetailsForm = this.fb.group({
            name: ['Mr Greg Kockott', [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]],
            cardNumber: ['', [CreditCardValidator.validateCCNumber]],
            expiryDate: ['', [CreditCardValidator.validateExpDate]],
            cvvNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],

        });
        this.countryOptions = [
            { label: 'South Africa', value: '1' },
            { label: 'USA', value: '2' },
            { label: 'India', value: '3' }
        ];
    }
}
