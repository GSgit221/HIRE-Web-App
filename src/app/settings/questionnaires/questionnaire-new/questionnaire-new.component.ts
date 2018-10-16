import { Router } from '@angular/router';
import { QuestionnaireService } from './../../../services/questionnaire.service';
import { FormHelperService } from './../../../services/form-helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    ) { }

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
        this.questionnaireService.create(this.form.value)
            .subscribe(() => {
                this.contentLoading = false;
                this.router.navigateByUrl(`dashboard/questionnaires`);
            }, error => console.error(error));
    }

}
