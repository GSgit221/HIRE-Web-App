import {Component, OnInit} from '@angular/core';
import * as closest from 'closest';
import {Router} from '@angular/router';


@Component({
    selector: 'app-questionnaires-list',
    templateUrl: './questionnaires-list.component.html',
    styleUrls: ['./questionnaires-list.component.scss']
})
export class QuestionnairesListComponent implements OnInit {
    contentLoading = false;
    list = [];
    selectedAll = false;
    selectedItems = 0;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.list = [
            {title: 'Senior System Engineer', id: 1, countQuestions: 4, created: 'May 12, 2018'},
            {title: 'Senior  Engineer', id: 2, countQuestions: 5, created: 'May 14, 2018'},
            {title: 'System Engineer', id: 3, countQuestions: 6, created: 'May 18, 2018'}
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
