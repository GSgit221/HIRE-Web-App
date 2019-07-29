import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FindVariables } from 'app/libs/util';
import { SelectItem } from 'primeng/components/common/api';

import { JobService } from '../../../../../../core/services';

declare var Quill: any;

@Component({
    selector: 'app-email-modal',
    templateUrl: './email-modal.component.html',
    styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {
    @Input() visible: boolean;
    @Input() jobId: string;
    @Input() candidates: any[];
    @Output() onHide = new EventEmitter<boolean>();
    @ViewChild('pEditor') pEditor: any;

    contentLoading: boolean = false;
    InsertPlaceholders: SelectItem[];
    InsertTitles: string[];
    cursorPosition: any;
    quill: any;

    emailModalForm: FormGroup;

    constructor(private fb: FormBuilder, private jobService: JobService) {
        this.InsertPlaceholders = [
            { label: 'candidate_name', value: '{{candidate_name}}', title: 'Candidate Name' },
            { label: 'missing_fields', value: '{{missing_fields}}', title: 'Missing Fields' },
            { label: 'sender_email', value: '{{sender_email}}', title: 'Sender Email' },
            { label: 'sender_name', value: '{{sender_name}}', title: 'Sender Name' },
            { label: 'job_title', value: '{{job_title}}', title: 'Job Title' },
            { label: 'sender_company', value: '{{sender_company}}', title: 'Sender Company' },
            { label: 'tenant_name', value: '{{tenant_name}}', title: 'Tenant Name' },
            { label: 'recruiter', value: '{{recruiter}}', title: 'Recruiter' },
            { label: 'job_owner', value: '{{job_owner}}', title: 'Job Owner' }
        ];
        this.InsertTitles = this.InsertPlaceholders.filter(({ title }) => !!title).map(({ title }) => title);
    }

    ngOnInit() {
        this.emailModalForm = this.fb.group({
            subject: [null, Validators.required],
            content: ['', Validators.required],
            emailplaceholder: ['']
        });
    }

    ngAfterViewInit() {
        this.quill = this.pEditor.quill;
        this.textChange(this.quill);
    }

    onHideModal() {
        this.emailModalForm.reset();
        this.onHide.next(false);
    }

    async onSend() {
        const form = this.emailModalForm;
        if (!form.valid) {
            console.log('FORM IS INVALID:', form);
            return;
        }
        console.log('FORM IS VALID:', form.value);

        let { content } = form.value;
        this.InsertPlaceholders.forEach(({ title, value }) => {
            if (title) content = content.replace(new RegExp(title, 'gi'), value);
        });
        content = content.replace(
            new RegExp('color: white;', 'gi'),
            `
                color: white;
                mix-blend-mode: multiply;
                border-radius: 11px;
                background-color: rgb(59, 178, 115);
                line-height: 22px;
                margin: 0 5px 3px;
                display: inline-block;
                padding: 0px 10px;
            `
        );

        this.contentLoading = true;
        const formValue = form.value;

        try {
            for (let candidate of this.candidates) {
                await this.jobService
                    .sendEmailToCandidate(this.jobId, candidate[0], { ...formValue, content })
                    .subscribe(console.log);
            }
            this.onHideModal();
        } catch (e) {
            this.contentLoading = false;
        }
    }

    onChangePlaceholder(event) {
        let index: number = this.cursorPosition ? this.cursorPosition.index : 0;
        const placeholder = this.InsertPlaceholders.find(({ value }) => value === event.value);
        const placeText = placeholder.title || placeholder.value;
        this.quill.insertText(index, placeText, {}, 'user');
        this.quill.insertText(index + placeText.length, ' ', 'user');
        //function of format {{}} variables
        this.formateQuillTest(this.quill);
    }

    textChange(quill) {
        quill.on('text-change', (delta, oldContents, source) => {
            this.formateQuillTest(quill);
        });

        quill.on('selection-change', (range, oldRange, source) => {
            this.cursorPosition = oldRange;
        });
    }

    formateQuillTest(quill) {
        const inset = quill.getText();
        let variables = FindVariables(inset, this.InsertTitles);

        for (let variable of variables) {
            quill.formatText(
                variable.index,
                variable.index + variable.name.length,
                variable.isTitle
                    ? {
                          color: 'white'
                      }
                    : {
                          color: '#8e8e93'
                      },
                'silent'
            );

            quill.formatText(
                variable.index + variable.name.length,
                variable.index + variable.name.length + 1,
                {
                    color: '#000'
                },
                'silent'
            );
        }
    }
}
