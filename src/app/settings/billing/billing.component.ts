import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

    contentLoading = false;
    activeSection = 'billing-plan';
    sections = ['billing-plan', 'billing-details', 'billing-history'];

    constructor() {
    }

    ngOnInit() {
    }

    onChangeSection(section: string) {
        this.activeSection = section;
    }

}
