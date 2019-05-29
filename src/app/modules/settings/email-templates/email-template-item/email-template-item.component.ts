import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Message, SelectItem } from 'primeng/components/common/api';

import { EmailTemplate } from '../../../../core/models/email-template';
import { EmailService } from '../../../../core/services/email.service';
import * as fromStore from '../store';
import * as fromStoreActions from '../store/actions/emails.action';
import * as fromStoreSelectors from '../store/selectors/emails.selector';
import { FormHelperService } from './../../../../core/services/form-helper.service';
import { DomHandler } from './../../../../libs/editor/domhandler';

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
    textContent: any;
    itemForm: FormGroup;
    msgs: Message[] = [];
    InsertPlaceholders: SelectItem[];
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
    constructor(
        private emailService: EmailService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private store: Store<fromStore.EmailsState>,
        public el: ElementRef
    ) {
        this.emailTemplateId = this.route.snapshot.url[0].path;
        this.itemForm = this.fb.group({
            title: ['', Validators.required],
            subject: ['', Validators.required],
            from: ['owner', Validators.required],
            delayed: ['none', Validators.required],
            content: ['', Validators.required],
            emailplaceholder: ['']
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
    @Input() get readonly(): boolean {
        return this._readonly;
    }

    set readonly(val: boolean) {
        this._readonly = val;

        if (this.quill) {
            if (this._readonly) {
                this.quill.disable();
            } else {
                this.quill.enable();
            }
        }
    }

    @Output() onTextChange: EventEmitter<any> = new EventEmitter();

    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();

    @Input() placeholder: string;

    @Input() formats: string[];

    @Input() modules: any;

    @Input() bounds: Element;

    @Input() scrollingContainer: Element;

    @Input() debug: string;

    @Output() onInit: EventEmitter<any> = new EventEmitter();

    value: string;

    _readonly: boolean;

    quill: any;

    ngOnInit() {}

    ngAfterViewInit() {
        const editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        const toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        const defaultModule = { toolbar: toolbarElement };
        const modules = this.modules ? { ...defaultModule, ...this.modules } : defaultModule;

        this.quill = new Quill(editorElement, {
            modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });

        if (this.value) {
            this.quill.pasteHTML(this.value);
        }

        this.quill.on('text-change', (delta, oldContents, source) => {
            this.textContent = oldContents;
            if (source === 'user') {
                let html = editorElement.children[0].innerHTML;
                const text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }

                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta,
                    source
                });
            }
        });

        this.quill.on('selection-change', (range, oldRange, source) => {
            this.cursorPosition = oldRange;
            this.onSelectionChange.emit({
                range,
                oldRange,
                source
            });
        });

        this.onInit.emit({
            editor: this.quill
        });
    }

    initForm(item) {
        this.itemForm = this.fb.group({
            title: [item.title || '', Validators.required],
            subject: [item.subject || '', Validators.required],
            from: [item.from || 'owner', Validators.required],
            delayed: [item.delayed || 'none', Validators.required],
            content: [item.content || '', Validators.required],
            emailplaceholder: [item.emailplaceholder || '']
        });
    }

    onSave() {
        const form = this.itemForm;
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
            this.store.dispatch(new fromStoreActions.CreateEmail(form.value));
        } else {
            this.store.dispatch(new fromStoreActions.UpdateEmail({ id: this.item.id, data: form.value }));
            setTimeout(() => {
                this.item = { ...this.item, ...form.value };
                this.contentLoading = false;
            }, 1000);

            // this.emailService.update(this.item.id, form.value).subscribe(
            //     (emailTemplate: EmailTemplate) => {
            //         this.contentLoading = false;
            //     },
            //     (errorResponse) => {
            //         console.error(errorResponse);
            //         this.msgs = [{ severity: 'error', detail: errorResponse.error.error || 'Error' }];
            //         this.contentLoading = false;
            //     }
            // );
        }
    }

    onChangePlaceholder(event) {
        const inset = this.textContent ? this.textContent.ops[0].insert : '';
        const index = this.cursorPosition ? this.cursorPosition.index : 0;
        const editor_content = [inset.slice(0, index), event.value, inset.slice(index)].join('');
        this.quill.setContents({
            ops: [{ insert: editor_content }]
        });
        // this.itemForm.controls['content'].setValue(a);
    }
}
