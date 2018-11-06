import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {

    invoiceList = [];
    selectedItems = 0;
    selectedAll = false;

    constructor() {
    }

    ngOnInit() {
      this.invoiceList = [
          {
              invoiceName: 'Welcome and Registration',
              date: '15 March 2018',
              ammount: 'EUR 499'
          },
          {
              invoiceName: 'Keynote Presentation: Greg Knockott',
              date: '15 April 2018',
              ammount: 'USD 799'
          }
      ]
    }

    private calculateSelectedInvoice() {
        this.selectedItems = this.invoiceList.filter(invoice => invoice.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    onItemSeletectedChange() {
        this.calculateSelectedInvoice();
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.invoiceList.forEach(invoice => invoice.selected = true);
        } else {
            this.invoiceList.forEach(invoice => invoice.selected = false);
        }
        this.calculateSelectedInvoice();
    }
}
