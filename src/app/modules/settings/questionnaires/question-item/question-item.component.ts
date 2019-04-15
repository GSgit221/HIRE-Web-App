import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';

import { Question } from './../../../../models/question';
import { Questionnaire } from './../../../../models/questionnaire';
import { FormHelperService } from './../../../../services/form-helper.service';
import { QuestionnaireService } from './../../../../services/questionnaire.service';
import { UtilitiesService } from './../../../../services/utilities.service';
import { ConditionalValidator } from './../../../../validators/conditional.validator';

@Component({
    selector: 'app-question-item',
    templateUrl: './question-item.component.html',
    styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
    questionnaireId: string;
    questionId: string;
    questionnaire: Questionnaire;
    question: Question;
    initialLoading = true;
    contentLoading = true;
    questionForm: FormGroup;
    questionTypeOptions = [
        { label: 'Multiple Choice', value: 'multiple' },
        { label: 'Single Choice', value: 'single' },
        { label: 'One Way Video Question', value: 'one-way-video' }
    ];
    typeQuestion = 'multiple';
    videoQuestionOption = {
        review_time: [
            { label: '30 seconds', value: 30 },
            { label: '60 seconds', value: 60 },
            { label: '120 seconds', value: 120 }
        ],
        answer_time: [
            { label: '30 seconds', value: 30 },
            { label: '60 seconds', value: 60 },
            { label: '120 seconds', value: 120 }
        ],
        number_of_takes: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
        ]
    };
    msgs: Message[] = [];

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private questionnaireService: QuestionnaireService,
        private router: Router,
        private route: ActivatedRoute,
        private utilities: UtilitiesService
    ) {
        this.questionnaireId = this.route.snapshot.paramMap.get('questionnaireId');
        this.questionId = this.route.snapshot.paramMap.get('questionId');
        this.questionnaireService.getById(this.questionnaireId).subscribe((questionnaire: Questionnaire) => {
            this.questionnaire = questionnaire;
            this.contentLoading = false;
            console.log(this.questionnaire);
        });

        if (this.questionId !== 'new') {
            this.questionnaireService
                .getQuestion(this.questionnaireId, this.questionId)
                .subscribe((question: Question) => {
                    console.log('QUESTION', question);
                    this.question = question;
                    console.log(this.question);
                    this.contentLoading = false;
                    this.initialLoading = false;
                    this.populateForm();
                });
        } else {
            this.initialLoading = false;
        }
    }

    ngOnInit() {
        this.questionForm = this.fb.group({
            text: ['', Validators.required],
            type: ['multiple', Validators.required],
            is_required: [true],
            answers: this.fb.array([this.createItem(true), this.createItem(true)]),
            review_time: [30],
            answer_time: [30],
            number_of_takes: [1]
        });
        this.questionForm.get('type').valueChanges.subscribe((val) => {
            if (val === 'one-way-video') {
                this.answers.controls.forEach((answerControl: FormGroup, index) => {
                    answerControl.controls['text'].setValidators([]);
                    answerControl.controls['text'].updateValueAndValidity();
                });
            } else {
                this.answers.controls.forEach((answerControl: FormGroup, index) => {
                    if (index < 2) {
                        answerControl.controls['text'].setValidators([Validators.required]);
                    }
                    answerControl.controls['text'].updateValueAndValidity();
                });
            }
        });
    }

    get answers() {
        return this.questionForm && (this.questionForm.get('answers') as FormArray);
    }

    get type() {
        return this.questionForm && this.questionForm.get('type');
    }

    createItem(required = false): FormGroup {
        return this.fb.group({
            id: this.utilities.generateUID(8).toLowerCase(),
            text: ['', ConditionalValidator.validate(() => required, Validators.required)],
            is_knockout: [false]
        });
    }

    populateItem(data, required = false): FormGroup {
        return this.fb.group({
            id: [data.id],
            text: [data.text, ConditionalValidator.validate(() => required, Validators.required)],
            is_knockout: [data.is_knockout]
        });
    }

    isAddAvailable() {
        const available = this.questionForm.get('answers').value.every((a) => a.text && a.text.length);
        return available;
    }

    onAddAnswer(): void {
        if (this.questionForm.get('answers').value.every((a) => a.text && a.text.length)) {
            const newItem = this.createItem();
            this.answers.push(newItem);
        }
    }

    populateForm() {
        console.log('populate form', this.question);
        const answersArr = [];
        if (this.question.answers) {
            this.question.answers.forEach((a, index) => {
                const required = index < 2;
                answersArr.push(this.populateItem(a, required));
            });
        }

        this.questionForm = this.fb.group({
            text: [this.question.text, Validators.required],
            type: [this.question.type, Validators.required],
            is_required: [this.question.is_required],
            answers: this.fb.array(answersArr),
            review_time: [this.question.review_time || 30],
            answer_time: [this.question.answer_time || 30],
            number_of_takes: [this.question.number_of_takes || 1]
        });
    }

    onSave() {
        const form = this.questionForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        // this.contentLoading = true;

        const formValue = this.getFormValue(form);
        if (this.questionId === 'new') {
            this.questionnaireService.createQuestion(this.questionnaireId, formValue).subscribe(
                () => {
                    this.contentLoading = false;
                    this.router.navigateByUrl(`dashboard/settings/questionnaires/${this.questionnaireId}/questions`);
                },
                (error) => {
                    console.error(error);
                    this.msgs = [{ severity: 'error', detail: error.error.error || 'Error' }];
                    this.contentLoading = false;
                }
            );
        } else {
            this.questionnaireService.updateQuestion(this.questionnaireId, this.questionId, formValue).subscribe(
                () => {
                    this.contentLoading = false;
                    this.router.navigateByUrl(`dashboard/settings/questionnaires/${this.questionnaireId}/questions`);
                },
                (error) => {
                    console.error(error);
                    this.msgs = [{ severity: 'error', detail: error.error.error || 'Error' }];
                    this.contentLoading = false;
                }
            );
        }
    }

    getFormValue(form) {
        const formValue = form.value;
        return formValue.type === 'one-way-video'
            ? this.utilities.omit(formValue, ['answers'])
            : this.utilities.omit(formValue, ['review_time', 'answer_time', 'number_of_takes']);
    }
}
