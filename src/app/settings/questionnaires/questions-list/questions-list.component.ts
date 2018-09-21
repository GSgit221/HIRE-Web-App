import {Component, OnInit} from '@angular/core';
import * as closest from 'closest';
import {Router} from '@angular/router';

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
    contentLoading = false;
    list = [];
    selectedAll = false;
    selectedItems = 0;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.list = [{title: 'Are you a South African citizen or are you legally allowed to work in South Africa?', id: 1, type: 'Multiple Choice', knockout: true},
            {title: 'Graduate Recruit Program', id: 2, type: '', knockout: false}
        ];
    }
    onItemClick(event, item) {
        console.log('onItemClick');
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            console.log('REDIRECT');
            this.router.navigate([`/dashboard/questionnaires/${item.id}/questions/new`]);
        }
    }
    onSelectAllChange() {
        if (this.selectedAll) {
            this.list.forEach(item => item.selected = true);
        } else {
            this.list.forEach(item => item.selected = false);
        }
        this.calculateSelectedItems();
    }
    private calculateSelectedItems() {
        this.selectedItems = this.list.filter(item => item.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }
    onItemSeletectedChange() {
        this.calculateSelectedItems();
    }
    onItemsBulkRemove() {
        this.contentLoading = true;
        const itemsToRemove = this.list.filter(item => item.selected).map(item => item.id);
        console.log(itemsToRemove);
    }

}
