import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as closest from 'closest';

import { Questionnaire } from './../../../../models/questionnaire';
import { QuestionnaireService } from './../../../../services/questionnaire.service';

@Component({
    selector: 'app-questionnaires-list',
    templateUrl: './questionnaires-list.component.html',
    styleUrls: ['./questionnaires-list.component.scss']
})
export class QuestionnairesListComponent implements OnInit {
    contentLoading = true;
    list: Questionnaire[] = [];
    selectedAll = false;
    selectedItems = 0;
    constructor(private router: Router, private questionnaireService: QuestionnaireService) {
        this.questionnaireService.getAll().subscribe(
            (response: Questionnaire[]) => {
                console.log('Questionnaires', response);
                this.contentLoading = false;
                if (response) {
                    this.list = response;
                }
            },
            (error) => console.error(error)
        );
    }

    ngOnInit() {
        // this.list = [
        //     {title: 'Senior System Engineer', id: 1, countQuestions: 4, created: 'May 12, 2018'},
        //     {title: 'Senior  Engineer', id: 2, countQuestions: 5, created: 'May 14, 2018'},
        //     {title: 'System Engineer', id: 3, countQuestions: 6, created: 'May 18, 2018'}
        // ];
    }
    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            this.router.navigate([`/dashboard/settings/questionnaires/${item.id}/questions`]);
        }
    }
    onSelectAllChange() {
        if (this.selectedAll) {
            this.list.forEach((item) => (item.selected = true));
        } else {
            this.list.forEach((item) => (item.selected = false));
        }
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
        this.questionnaireService.bulkDelete(itemsToRemove).subscribe(() => {
            this.questionnaireService.getAll().subscribe(
                (response: Questionnaire[]) => {
                    this.contentLoading = false;
                    this.list = response;
                    this.calculateSelectedItems();
                },
                (error) => console.error(error)
            );
        });
    }
}
