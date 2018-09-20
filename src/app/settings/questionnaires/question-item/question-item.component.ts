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
    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) { }

    ngOnInit() {
        this.questionForm = this.fb.group({
            question: [''],
            type: ['multiple'],
            is_required: [true]
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
    }

}
