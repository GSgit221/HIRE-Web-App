import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as closest from 'closest';

import { Questionnaire } from '../../../../models/questionnaire';
import * as fromStore from '../store';
import * as fromQuestionnaireSelectors from '../store/selectors/questionnaires.selector';
import { Question } from './../../../../models/question';
import { QuestionnaireService } from './../../../../services/questionnaire.service';

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
    questionnaireId: string;
    contentLoading = true;
    list = [];
    selectedAll = false;
    selectedItems = 0;
    questionnaire: Questionnaire;
    questions: Question[] = [];

    constructor(
        private questionnaireService: QuestionnaireService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromStore.QuestionnairesState>
    ) {
        this.questionnaireId = this.route.snapshot.paramMap.get('questionnaireId');
        this.store
            .select<Questionnaire>(fromQuestionnaireSelectors.getSelectedQuestionnaire)
            .subscribe((questionnaire: Questionnaire) => {
                this.questionnaire = questionnaire;
            });

        this.questionnaireService.getQuestions(this.questionnaireId).subscribe((questions: Question[]) => {
            this.list = questions.sort((a, b) => a.created_at - b.created_at);
            console.log(this.list);
            this.contentLoading = false;
        });
    }

    ngOnInit() {}

    onItemClick(event, item) {
        console.log('onItemClick');
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            console.log('REDIRECT');
            this.router.navigate([`/dashboard/settings/questionnaires/${this.questionnaireId}/questions/${item.id}`]);
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
        console.log(itemsToRemove);

        this.questionnaireService.questionsBulkDelete(this.questionnaireId, itemsToRemove).subscribe(() => {
            this.questionnaireService.getQuestions(this.questionnaireId).subscribe(
                (questions: Question[]) => {
                    this.list = questions;
                    console.log(this.list);
                    this.contentLoading = false;
                    this.calculateSelectedItems();
                },
                (error) => console.error(error)
            );
        });
    }

    hasKnockoutAnswers(item: Question) {
        if (item.answers) {
            const knockout = item.answers.find((a) => a.is_knockout);
            return knockout ? true : false;
        } else {
            return false;
        }
    }
}
