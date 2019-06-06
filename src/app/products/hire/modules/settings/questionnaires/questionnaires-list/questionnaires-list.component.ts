import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as closest from 'closest';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { UtilitiesService } from './../../../../../../core/services/utilities.service';

import { Questionnaire } from './../../../../../../core/models/questionnaire';
import { QuestionnaireService } from './../../../../../../core/services/questionnaire.service';

@Component({
    selector: 'app-questionnaires-list',
    templateUrl: './questionnaires-list.component.html',
    styleUrls: ['./questionnaires-list.component.scss']
})
export class QuestionnairesListComponent implements OnInit {
    contentLoading = true;
    list: Questionnaire[] = [];
    // questionnaires$: Observable<Questionnaire[]>;
    selectedAll = false;
    selectedItems = 0;
    baseURL: string;

    constructor(
        private router: Router,
        private questionnaireService: QuestionnaireService,
        private store: Store<fromStore.QuestionnairesState>,
        private utilities: UtilitiesService
    ) {
        this.baseURL = this.utilities.getHireBaseUrl();
        // Get questionnaires from store
        this.store.pipe(select(fromStore.getAllQuestionnaires)).subscribe((questionnaires: Questionnaire[]) => {
            if (questionnaires) {
                this.list = questionnaires.map((item) => ({
                    ...item,
                    selected: false
                }));
            }
        });
        // Get loading state from stroe
        this.store.pipe(select(fromStore.getQuestionnairesLoaded)).subscribe((loaded: boolean) => {
            if (loaded) {
                this.contentLoading = false;
            }
        });
    }

    ngOnInit() {}

    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            this.router.navigateByUrl(`${this.baseURL}/settings/questionnaires/${item.id}/questions`);
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
