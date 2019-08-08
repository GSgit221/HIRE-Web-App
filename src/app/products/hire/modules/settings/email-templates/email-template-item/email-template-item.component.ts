import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Message, SelectItem } from 'primeng/components/common/api';

import { FindVariables } from 'app/libs/util';
import { EmailTemplate } from '../../../../../../core/models/email-template';
import { EmailService } from '../../../../../../core/services/email.service';
import * as fromStore from '../store';
import * as fromStoreActions from '../store/actions/emails.action';
import * as fromStoreSelectors from '../store/selectors/emails.selector';
import { FormHelperService } from './../../../../../../core/services/form-helper.service';

declare var Quill: any;

@Component({
    selector: 'app-email-template-item',
    templateUrl: './email-template-item.component.html',
    styleUrls: ['./email-template-item.component.scss']
})
export class EmailTemplateItemComponent implements OnInit {
    item: EmailTemplate;
    contentLoading = true;
    initialLoad = true;
    emailTemplateId: string;
    cursorPosition: any;
    itemForm: FormGroup;
    msgs: Message[] = [];
    InsertPlaceholders: SelectItem[];
    InsertTitles: string[];
    fromOptions = [
        { label: 'Job Owner Email', value: 'owner' },
        { label: 'Recruiter Initiating Email', value: 'recruiter' }
    ];
    delayOptions = [
        { label: 'None, send immidiatly', value: 'none' },
        { label: '1 hour', value: 3600 },
        { label: '6 hours', value: 3600 * 6 },
        { label: '1 day', value: 3600 * 24 },
        { label: '7 days', value: 3600 * 24 * 7 }
    ];
    editor: boolean = true;
    constructor(
        private emailService: EmailService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private store: Store<fromStore.EmailsState>
    ) {
        this.InsertPlaceholders = [
            { label: 'Candidate Name', value: '{{candidate_name}}', title: 'Candidate Name' },
            { label: 'Missing Fields', value: '{{missing_fields}}', title: 'Missing Fields' },
            { label: 'Sender Email', value: '{{sender_email}}', title: 'Sender Email' },
            { label: 'Sender Name', value: '{{sender_name}}', title: 'Sender Name' },
            { label: 'Job Title', value: '{{job_title}}', title: 'Job Title' },
            { label: 'Sender Company', value: '{{sender_company}}', title: 'Sender Company' },
            { label: 'Tenant Name', value: '{{tenant_name}}', title: 'Tenant Name' },
            { label: 'Recruiter', value: '{{recruiter}}', title: 'Recruiter' },
            { label: 'Job Owner', value: '{{job_owner}}', title: 'Job Owner' }
        ];
        this.InsertTitles = this.InsertPlaceholders.filter(({ title }) => !!title).map(({ title }) => title);

        this.emailTemplateId = this.route.snapshot.url[0].path;
        this.itemForm = this.fb.group({
            title: ['', Validators.required],
            subject: ['', Validators.required],
            from: ['owner', Validators.required],
            delayed: ['none', Validators.required],
            content: ['', Validators.required],
            email_content: [''],
            emailplaceholder: [''],
            hasSMS: [false],
            messageContent: ['', [Validators.minLength(10), Validators.maxLength(120)]]
        });
        this.store.pipe(select(fromStoreSelectors.getSelectedEmail)).subscribe(
            (emailTemplate: EmailTemplate) => {
                if (emailTemplate) {
                    this.item = emailTemplate;
                    this.initForm(this.item);
                }
            },
            (errorResponse) => console.error(errorResponse)
        );
        this.store.pipe(select(fromStoreSelectors.getEmailsLoaded)).subscribe((loaded: boolean) => {
            if (loaded) {
                this.contentLoading = false;
                this.initialLoad = false;
            }
        });
    }

    @ViewChild('pEditor') pEditor: any;
    @ViewChild('pEditorSec') pEditorSec: any;

    value: string;

    quill: any;
    quillSec: any;

    ngOnInit() {}

    ngAfterViewInit() {
        this.quill = this.pEditor.quill;
        this.quillSec = this.pEditorSec ? this.pEditorSec.quill : '';

        this.textChange(this.quill);
        if (this.item && (this.item.link === 1 || this.item.link === 2)) {
            this.textChange(this.quillSec);
        }
    }

    get hasSMS() {
        return this.itemForm && this.itemForm.get('hasSMS').value;
    }

    get messageContent() {
        return this.itemForm && this.itemForm.get('messageContent').value;
    }

    textChange(quill) {
        quill.root.setAttribute('spellcheck', false);
        quill.root.setAttribute('autocorrect', false);

        quill.on('text-change', (delta, oldContents, source) => {
            this.formateQuillTest(quill);
        });
        this.formateQuillTest(quill);

        quill.on('selection-change', (range, oldRange, source) => {
            this.cursorPosition = oldRange;
        });
    }

    initForm(item) {
        this.itemForm = this.fb.group({
            title: [item.title || '', Validators.required],
            subject: [item.subject || '', Validators.required],
            from: [item.from || 'owner', Validators.required],
            delayed: [item.delayed || 'none', Validators.required],
            content: [this.replacePlaceholder(item.content) || '', Validators.required],
            email_content: [this.replacePlaceholder(item.email_content) || ''],
            emailplaceholder: [item.emailplaceholder || ''],
            hasSMS: [item.hasSMS || false],
            messageContent: [item.messageContent || '', [Validators.minLength(10), Validators.maxLength(120)]]
        });
    }

    replacePlaceholder(content: string): string {
        let ret = content;
        this.InsertPlaceholders.forEach(({ value, title }) => (ret = ret.replace(new RegExp(value), title)));
        return ret;
    }

    onSave() {
        const form = this.itemForm;
        console.log(form);
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        this.contentLoading = true;
        const formValue = form.value;
        if (this.emailTemplateId === 'new') {
            this.store.dispatch(new fromStoreActions.CreateEmail(formValue));
        } else {
            this.store.dispatch(new fromStoreActions.UpdateEmail({ id: this.item.id, data: formValue }));
            setTimeout(() => {
                this.item = { ...this.item, ...formValue };
                this.contentLoading = false;
            }, 1000);
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

    onChangePlaceholderSec(event) {
        let index: number = this.cursorPosition ? this.cursorPosition.index : 0;
        const placeholder = this.InsertPlaceholders.find(({ value }) => value === event.value);
        const placeText = placeholder.title || placeholder.value;
        this.quillSec.insertText(index, placeText, {}, 'user');
        this.quillSec.insertText(index + placeText.length, ' ', 'user');
        //function of format {{}} variables
        this.formateQuillTest(this.quillSec);
    }

    onFocus(event) {
        this.editor = event;
    }

    formateQuillTest(quill) {
        const { ops: origin } = quill.getContents();

        let i = 0;
        let offset = 0;

        while (origin[i]) {
            const d = origin[i];
            if (d.attributes) {
                if (d.attributes.color === 'white') {
                    const placeholder = this.InsertPlaceholders.find(({ title }) => title === d.insert);
                    if (!placeholder) {
                        quill.removeFormat(offset, d.insert.length);
                        break;
                    }
                } else {
                    quill.removeFormat(offset, d.insert.length);
                    break;
                }
            } else {
                offset += (d.insert || '').length;
            }
            i++;
        }
        if (origin[i]) return;

        const inset = quill.getText();
        let variables = FindVariables(inset, this.InsertTitles);

        offset = 0;
        for (let { isTitle, ...variable } of variables) {
            if (!isTitle) {
                const placeholder = this.InsertPlaceholders.find(({ value }) => value === variable.name);
                if (placeholder && placeholder.title) {
                    const delta = { ops: [] };
                    const off = placeholder.title.length - variable.name.length;
                    delta.ops.push(
                        { retain: variable.index - offset },
                        { delete: variable.name.length },
                        { insert: placeholder.title + ' ' }
                    );
                    quill.updateContents(delta);
                    offset += off;
                }
                break;
            }
        }
        if (offset < 0) return;

        for (let variable of variables) {
            quill.formatText(
                variable.index,
                variable.index + variable.name.length,
                {
                    color: 'white'
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
