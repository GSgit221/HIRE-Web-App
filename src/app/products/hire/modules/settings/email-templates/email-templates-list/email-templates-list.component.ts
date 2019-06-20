import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as closest from 'closest';
import { UtilitiesService } from './../../../../../../core/services/utilities.service';

import * as fromStore from '../store';
import * as fromStoreActions from '../store/actions/emails.action';
import * as fromStoreSelectors from '../store/selectors/emails.selector';
import { EmailTemplate } from './../../../../../../core/models/email-template';

@Component({
    selector: 'app-email-templates-list',
    templateUrl: './email-templates-list.component.html',
    styleUrls: ['./email-templates-list.component.scss']
})
export class EmailTemplatesListComponent implements OnInit {
    list: EmailTemplate[];
    contentLoading = true;
    selectedAll = false;
    selectedItems = 0;
    baseUrl: string;

    constructor(
        private router: Router,
        private store: Store<fromStore.EmailsState>,
        private utilities: UtilitiesService
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.store.pipe(select(fromStoreSelectors.getAllEmails)).subscribe((emailTemplates: EmailTemplate[]) => {
            this.list = emailTemplates.map((item) => ({ ...item }));
            this.calculateSelectedItems();
            this.contentLoading = false;
        });
        this.store.pipe(select(fromStoreSelectors.getEmailsLoaded)).subscribe((loaded: boolean) => {
            if (loaded) {
                this.store.dispatch(new fromStoreActions.LoadEmails());
                this.contentLoading = false;
            }
        });
    }

    ngOnInit() {}

    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (!escapeDD) {
            this.router.navigate([`${this.baseUrl}/settings//email-templates/${item.id}`]);
        }
    }

    onSelectAllChange() {
        this.list = this.selectedAll
            ? this.list.map((item) => ({
                  ...item,
                  selected: !item.mandatory ? true : false
              }))
            : this.list.map((item) => ({ ...item, selected: false }));
        this.calculateSelectedItems();
    }

    private calculateSelectedItems() {
        this.selectedItems = this.list.filter((item) => item.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    onItemSeletectedChange() {
        this.calculateSelectedItems();
    }

    onItemsBulkRemove() {
        this.contentLoading = true;
        const itemsToRemove = this.list.filter((item) => item.selected).map((item) => item.id);
        this.store.dispatch(new fromStoreActions.BulkDeleteEmails(itemsToRemove));
    }

    noOptionalItems() {
        return !this.list || !this.list.length || !this.list.filter((item) => !item.mandatory).length;
    }
}
