import { FormHelperService } from './../../../services/form-helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-question-item',
    templateUrl: './question-item.component.html',
    styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
    contentLoading = false;
    questionForm: FormGroup;
    typeQuestion = 'multiple';
    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) { }
    questionTypeOptions = [
        {label: 'Multiple Choice', value: 'multiple'},
        {label: 'Single Choice', value: 'single'}
    ];
    ngOnInit() {
        this.questionForm = this.fb.group({
            question: ['', Validators.required],
            type: ['multiple', Validators.required],
            is_required: [true],
            answer: ['', Validators.required],
            answer_is_knockout1: [''],
            answer2: ['', Validators.required],
            answer_is_knockout2: [true]
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
    }

}
