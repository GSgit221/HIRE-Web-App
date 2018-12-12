import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormHelperService } from './../../../../services/form-helper.service';
import { QuestionnaireService } from './../../../../services/questionnaire.service';

@Component({
    selector: 'app-questionnaire-new',
    templateUrl: './questionnaire-new.component.html',
    styleUrls: ['./questionnaire-new.component.scss']
})
export class QuestionnaireNewComponent implements OnInit {
    form: FormGroup;
    contentLoading = false;

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private router: Router,
        private questionnaireService: QuestionnaireService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            title: ['', Validators.required]
        });
    }

    onSave(event) {
        event.preventDefault();
        if (!this.form.valid) {
            this.formHelper.markFormGroupTouched(this.form);
            console.log('FORM IS INVALID:', this.form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', this.form.value);
        this.contentLoading = true;
        this.questionnaireService.create(this.form.value).subscribe(
            () => {
                this.contentLoading = false;
                this.router.navigateByUrl(`dashboard/settings/questionnaires`);
            },
            (error) => console.error(error)
        );
    }
}
