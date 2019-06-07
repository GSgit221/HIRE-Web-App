import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilitiesService } from './../../../../../../core/services/utilities.service';

import * as fromStore from '../store';
import { FormHelperService } from './../../../../../../core/services/form-helper.service';
import { QuestionnaireService } from './../../../../../../core/services/questionnaire.service';

@Component({
    selector: 'app-questionnaire-new',
    templateUrl: './questionnaire-new.component.html',
    styleUrls: ['./questionnaire-new.component.scss']
})
export class QuestionnaireNewComponent implements OnInit {
    form: FormGroup;
    contentLoading = false;
    baseUrl: string;

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private router: Router,
        private questionnaireService: QuestionnaireService,
        private store: Store<fromStore.QuestionnairesState>,
        private utilities: UtilitiesService
    ) {}

    ngOnInit() {
        this.baseUrl = this.utilities.getHireBaseUrl();
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
                this.store.dispatch(new fromStore.LoadQuestionnaires());
                this.router.navigateByUrl(`${this.baseUrl}/settings/questionnaires`);
            },
            (error) => console.error(error)
        );
    }
}
