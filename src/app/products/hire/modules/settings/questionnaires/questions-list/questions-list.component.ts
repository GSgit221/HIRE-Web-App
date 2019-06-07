import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as closest from 'closest';

import { UtilitiesService } from '@app/core/services';
import { Questionnaire } from '../../../../../../core/models/questionnaire';
import * as fromStore from '../store';
import * as fromQuestionnaireSelectors from '../store/selectors/questionnaires.selector';
import { Question } from './../../../../../../core/models/question';
import { QuestionnaireService } from './../../../../../../core/services/questionnaire.service';

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
    draggedItem: any;
    baseUrl: string;

    constructor(
        private questionnaireService: QuestionnaireService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromStore.QuestionnairesState>,
        private utilities: UtilitiesService
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.questionnaireId = this.route.snapshot.paramMap.get('questionnaireId');
        this.store
            .pipe(select(fromQuestionnaireSelectors.getSelectedQuestionnaire))
            .subscribe((questionnaire: Questionnaire) => {
                this.questionnaire = questionnaire;
            });

        this.questionnaireService.getQuestions(this.questionnaireId).subscribe((questions: Question[]) => {
            this.list = questions
                .map((q) => {
                    if (!q.order) {
                        const maxOrder =
                            Math.max(...Object.values(questions).map((question) => question.order || 0)) || 0;
                        q.order = maxOrder + 1;
                    }
                    return q;
                })
                .sort((a, b) => a.order - b.order);
            console.log(this.list);
            this.contentLoading = false;
        });
    }

    ngOnInit() {}

    onItemClick(event, item) {
        // console.log('onItemClick', item);
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            console.log(`${this.baseUrl}/settings/questionnaires/${this.questionnaireId}/questions/${item.id}`);
            this.router.navigateByUrl(
                `${this.baseUrl}/settings/questionnaires/${this.questionnaireId}/questions/${item.id}`
            );
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

    onItemDragStart(stage) {
        this.draggedItem = stage;
    }

    onItemDragEnd() {
        this.draggedItem = null;

        // QUESIONS SERVICE
        this.questionnaireService
            .updateQuestionsOrder(this.questionnaireId, this.list)
            .subscribe(() => console.log('Order was updated'), (errorResponse) => console.error(errorResponse));
    }

    onItemDragOver(event, order) {
        if (order !== this.draggedItem.order) {
            const draggedOverStageIndex = this.list.findIndex((s) => s.order === order);
            const draggedItemIndex = this.list.findIndex((s) => s.order === this.draggedItem.order);
            // console.log('Dragged:', draggedItemIndex, 'Over:', draggedOverStageIndex);

            this.list.splice(draggedItemIndex, 1);
            this.list.splice(draggedOverStageIndex, 0, this.draggedItem);
            this.list.forEach((s, index) => {
                s.order = index + 1;
            });
        }
    }
}
