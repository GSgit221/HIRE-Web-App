import { Question } from './../../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from './../../../services/questionnaire.service';
import { FormHelperService } from './../../../services/form-helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Questionnaire } from 'src/app/models/questionnaire';

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
        { label: 'Single Choice', value: 'single' }
    ];
    typeQuestion = 'multiple';


    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private questionnaireService: QuestionnaireService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.questionnaireId = this.route.snapshot.paramMap.get('id');
        this.questionId = this.route.snapshot.paramMap.get('questionId');
        this.questionnaireService.getById(this.questionnaireId).subscribe((questionnaire: Questionnaire) => {
            this.questionnaire = questionnaire;
            this.contentLoading = false;
            console.log(this.questionnaire);
        });

        if (this.questionId !== 'new') {
            this.questionnaireService.getQuestion(this.questionnaireId, this.questionId)
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
            question: ['', Validators.required],
            type: ['multiple', Validators.required],
            is_required: [true],
            answer: ['', Validators.required],
            answer_is_knockout1: [false],
            answer2: ['', Validators.required],
            answer_is_knockout2: [false]
        });
    }

    populateForm() {
        console.log('populate form', this.question);
        this.questionForm = this.fb.group({
            question: [this.question.question, Validators.required],
            type: [this.question.type, Validators.required],
            is_required: [this.question.is_required],
            answer: [this.question.answer, Validators.required],
            answer_is_knockout1: [this.question.answer_is_knockout1],
            answer2: [this.question.answer2, Validators.required],
            answer_is_knockout2: [this.question.answer_is_knockout2]
        });
    }

    onChangeType() {
        this.typeQuestion = this.questionForm.controls['type'].value;
        if (this.typeQuestion === 'single') {
            this.questionForm.get('answer2').clearValidators();
            this.questionForm.get('answer2').updateValueAndValidity();
        } else {
            this.questionForm.get('answer2').setValidators([Validators.required]);
            this.questionForm.get('answer2').updateValueAndValidity();

        }
    }


    onSave() {
        console.log('save');
        const form = this.questionForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        this.contentLoading = true;

        if (this.questionId === 'new') {
            this.questionnaireService.createQuestion(this.questionnaireId, form.value)
                .subscribe(() => {
                    this.contentLoading = false;
                    this.router.navigateByUrl(`dashboard/questionnaires/${this.questionnaireId}/questions`);
                }, error => console.error(error));
        } else {
            this.questionnaireService.updateQuestion(this.questionnaireId, this.questionId, form.value)
                .subscribe(() => {
                    this.contentLoading = false;
                    this.router.navigateByUrl(`dashboard/questionnaires/${this.questionnaireId}/questions`);
                }, error => console.error(error));
        }
    }

}
