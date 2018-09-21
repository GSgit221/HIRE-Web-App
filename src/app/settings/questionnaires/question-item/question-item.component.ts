import { FormHelperService } from './../../../services/form-helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-question-item',
    templateUrl: './question-item.component.html',
    styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
    contentLoading = false;
    questionForm: FormGroup;
    questionTypeShow = 'multiple';
    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) { }
    questionType = [
        {label: 'Multiple Choice', value: 'multiple'},
        {label: 'Single Choice', value: 'single'}
    ];
    ngOnInit() {
        this.questionForm = this.fb.group({
            question: [''],
            type: ['multiple'],
            is_required: [true],
            answerFirst: [''],
            answer_is_knockout1: [''],
            answerSecond: [''],
            answer_is_knockout2: [true]
        });
    }
    onChangeType() {
        console.log('change dropdown');
        console.log(this.questionForm.controls['type'].value);
        this.questionTypeShow = this.questionForm.controls['type'].value;
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
    }

}
