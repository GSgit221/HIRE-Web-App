import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
            name: ['Mr Greg Kockott', Validators.required],
            cardNumber: ['', [Validators.required]],
            expiryDate: ['', Validators.required],
            cvvNumber: ['', [Validators.required]],

        });
        this.countryOptions = [
            { label: 'South Africa', value: '1' },
            { label: 'USA', value: '2' },
            { label: 'India', value: '3' }
        ];
    }
    onkeypress(e) {
        if (!((e.keyCode >= 48 && e.keyCode <= 57))) {
            e.preventDefault();
        }

    }
}
