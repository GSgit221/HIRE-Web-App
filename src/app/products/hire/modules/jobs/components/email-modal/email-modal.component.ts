import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FindVariables } from 'app/libs/util';
import { Message, SelectItem } from 'primeng/components/common/api';

declare var Quill: any;

@Component({
    selector: 'app-email-modal',
    templateUrl: './email-modal.component.html',
    styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {
    @Input() visible: boolean;
    @Input() candidates: string[];
    @Output() onHide = new EventEmitter<boolean>();
    @ViewChild('pEditor') pEditor: any;

    contentLoading: boolean = false;
    InsertPlaceholders: SelectItem[];
    cursorPosition: any;
    quill: any;

    emailModalForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.InsertPlaceholders = [
            { label: 'candidate_name', value: '{{candidate_name}}' },
            { label: 'missing_fields', value: '{{missing_fields}}' },
            { label: 'sender_email', value: '{{sender_email}}' },
            { label: 'sender_name', value: '{{sender_name}}' },
            { label: 'job_title', value: '{{job_title}}' },
            { label: 'sender_company', value: '{{sender_company}}' },
            { label: 'tenant_name', value: '{{tenant_name}}' },
            { label: 'recruiter', value: '{{recruiter}}' },
            { label: 'job_owner', value: '{{job_owner}}' }
        ];
    }

    ngOnInit() {
        console.log(this.candidates);
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

    private onHideModal() {
        this.emailModalForm.reset();
        this.onHide.next(false);
    }

    private onSend() {
        const form = this.emailModalForm;
        if (!form.valid) {
            console.log('FORM IS INVALID:', form);
            return;
        }
        console.log('FORM IS VALID:', form.value);

        this.contentLoading = true;
        const formValue = form.value;

        console.log(formValue);

        this.contentLoading = false;
    }

    onChangePlaceholder(event) {
        let index: number = this.cursorPosition ? this.cursorPosition.index : 0;
        this.quill.insertText(index, event.value, {}, 'user');
        this.quill.insertText(index + event.value.length, ' ', 'user');
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
        let variables = FindVariables(inset);

        for (let variable of variables) {
            quill.formatText(
                variable.index,
                variable.index + variable.name.length,
                {
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
