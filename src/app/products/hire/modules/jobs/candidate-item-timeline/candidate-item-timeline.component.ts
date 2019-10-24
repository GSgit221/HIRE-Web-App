import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FindVariables } from 'app/libs/util';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Candidate, ITag, Job, User } from './../../../../../core/models';
import { CandidateService, JobService, UserService, UtilitiesService } from './../../../../../core/services';
import * as fromStore from './../../../../../store';
import * as fromSelectors from './../../../../../store/selectors';

declare var Quill: any;

@Component({
    selector: 'app-candidate-item-timeline',
    templateUrl: './candidate-item-timeline.component.html',
    styleUrls: ['./candidate-item-timeline.component.scss']
})
export class CandidateItemTimelineComponent implements OnInit, OnDestroy {
    @Input() job: Job;
    @Input() candidate: Candidate;
    user: User;
    users: User[];
    usersSubscription: Subscription;

    commentForm: FormGroup;
    contentLoading = false;
    auditData: any[] = [];
    audit = [];

    @ViewChild('pEditor') pEditor: any;
    quill: any;
    cursorPosition: any;
    globalTags: ITag[] = [];
    currentHash: string = '';
    createMode: boolean = false;
    hashColors: string[] = [];
    newHashes: ITag[] = [];
    lastHash: ITag = null;

    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private jobService: JobService,
        private userService: UserService,
        private toastr: ToastrService,
        private store: Store<fromStore.State>,
        private utilities: UtilitiesService
    ) {
        this.globalTags = [
            {
                hash: '#internal',
                color: '#3bb273'
            },
            {
                hash: '#do-not-hire',
                color: '#ff3b30'
            }
        ];
        this.hashColors = [
            '#f6f8f9',
            '#fe602c',
            '#fc9a04',
            '#eec302',
            '#a4cf2f',
            '#37c3aa',
            '#20aaea',
            '#7a6ff0',
            '#e362e3',
            '#ea4d9d',
            '#fc91ad',
            '#525f7f'
        ];
    }

    ngOnInit() {
        this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = user;
            // this.loadAudit();
        });
        this.usersSubscription = this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.users = [...users];
            if (this.users && this.users.length) {
                this.loadAudit();
            }
        });
        this.commentForm = this.fb.group({
            description: ['', Validators.required]
        });
    }

    ngAfterViewInit() {
        this.quill = this.pEditor.quill;

        this.textChange(this.quill);
    }

    get tags(): ITag[] {
        return [...this.globalTags, ...(this.job.tags || []), ...this.newHashes];
    }

    get tagWithTitles(): ITag[] {
        return this.tags
            .filter(({ hash }) => hash.indexOf(this.currentHash) !== -1)
            .map(({ hash, color }) => ({ hash, color, title: this.titleCase(hash) }));
    }

    get tagTitles(): string[] {
        const titles = [...this.tags.map(({ hash }) => this.titleCase(hash)), ...this.tags.map(({ hash }) => hash)];
        return this.currentHash ? [...titles, this.currentHash] : titles;
    }

    get suggestionPosition() {
        const span = document.querySelector('.ql-editor p:last-child span:last-child');
        return {
            top:
                Number(document.querySelector('.ql-editor p:last-child')['offsetTop']) +
                (this.lastHash ? 29 : 22) -
                Number(document.querySelector('.ql-editor').scrollTop),
            left: span
                ? Math.min(span['offsetLeft'], span['offsetParent']['offsetWidth'] - (this.lastHash ? 130 : 269)) -
                  (this.lastHash ? 63 + this.lastHash.hash.length * 3 : 0)
                : 11
        };
    }

    getTagStyle(color: string) {
        function getTextColor(color: string): string {
            return color === '#f6f8f9' ? 'black' : 'white';
            // const r = parseInt(color.substr(1, 2), 16);
            // const g = parseInt(color.substr(3, 2), 16);
            // const b = parseInt(color.substr(5, 2), 16);
            // return (r * 299 + g * 587 + b * 114) / 1000 > 138 ? 'black' : 'white';
        }
        return {
            background: color,
            color: getTextColor(color)
        };
    }

    getTag(hash: string): ITag {
        return this.tags.find((tag) => tag.hash === hash || this.titleCase(tag.hash) === hash);
    }

    textChange(quill: any) {
        quill.root.setAttribute('spellcheck', false);
        quill.root.setAttribute('autocorrect', false);

        quill.on('text-change', (delta, oldContents, source) => {
            this.formatQuill(quill);
        });
        this.formatQuill(quill);

        quill.on('selection-change', (range, oldRange, source) => {
            this.cursorPosition = oldRange;
        });

        quill.keyboard.bindings[13].splice(0, 0, {
            key: 13,
            collapsed: true,
            handler: this.onSaveComment.bind(this)
        });
    }

    titleCase(str: string) {
        return str
            .replace(/#/g, '')
            .split(/[-|_]/g)
            .join(' ')
            .replace(/\w*\S/g, (t) => t[0].toUpperCase() + t.substr(1));
    }

    placeHash(tag: ITag) {
        const { ops: origin } = this.quill.getContents();

        const lastIndex = origin[origin.length - 1].insert === '\n' ? origin.length - 2 : origin.length - 1;
        const last = origin[lastIndex].insert.split(' ');
        let hashIndex = -1;
        let hashOffset = 0;
        if (last.length) {
            hashIndex = last[last.length - 1].lastIndexOf('#');
            for (let i = 0; i < last.length - 1; i++) hashOffset += last[i].length + 1;
        }

        if (hashIndex === -1) return;
        hashOffset += hashIndex;
        hashIndex = origin[lastIndex].insert.length - hashOffset;

        let i = 0;
        let offset = 0;
        while (i < lastIndex) {
            offset += (origin[i].insert || '').length;
            i++;
        }

        const delta = { ops: [] };
        delta.ops.push({ retain: offset + hashOffset }, { delete: hashIndex }, { insert: tag.hash });
        if (offset === 0) delta.ops.shift();
        if (hashIndex === 0) delta.ops.shift();
        this.quill.updateContents(delta);
    }

    onCreateNew() {
        this.createMode = true;
        this.lastHash = {
            hash: this.currentHash,
            color: this.hashColors[0]
        };
        this.newHashes.push(this.lastHash);
        this.formatQuill(this.quill);
    }

    async onDeleteTag(deleteHash) {
        this.contentLoading = true;
        const removeTag = this.candidate.tags.find(({ hash }) => hash === deleteHash);
        this.candidate.tags = this.candidate.tags.filter(({ hash }) => hash !== deleteHash);
        await new Promise((resolve, reject) => {
            this.jobService
                .updateCandidateTags(this.job.id, this.candidate.id, { tags: this.candidate.tags })
                .subscribe(resolve, reject);
        });
        const comment = {
            id: this.utilities.generateUID(10).toLowerCase(),
            text: JSON.stringify([removeTag]),
            param: 'removed',
            created_at: new Date().getTime(),
            user_id: this.user.id,
            type: 'tags'
        };
        this.candidateService.addToAudit(this.job.id, this.candidate.id, comment).subscribe(
            (response) => {
                this.commentForm.reset();
                this.contentLoading = false;
                this.auditData.push(comment);
                this.audit = this.transformAudit(this.auditData);
            },
            (errorResponse) => {
                console.error(errorResponse);
                this.contentLoading = false;
            }
        );
    }

    onChangeHashColor(color: string) {
        this.lastHash.color = color;
        this.formatQuill(this.quill);
        this.createMode = false;
    }

    formatQuill(quill: any) {
        const { ops: origin } = quill.getContents();

        const lastIndex = origin[origin.length - 1].insert === '\n' ? origin.length - 2 : origin.length - 1;
        if (lastIndex < 0) return;
        const last = origin[lastIndex].insert.split(' ');
        let hashIndex = -1;
        if (last.length && (hashIndex = last[last.length - 1].lastIndexOf('#')) !== -1) {
            const newHash = last[last.length - 1].substr(hashIndex).replace(/\n/g, '');
            if (this.currentHash !== newHash && (!this.lastHash || (this.lastHash && this.lastHash.hash !== newHash))) {
                this.currentHash = newHash;
                this.createMode = false;
                this.lastHash = null;
            }
        } else {
            this.currentHash = '';
            if (
                !this.lastHash ||
                (origin[lastIndex].insert !== ' ' &&
                    origin[lastIndex - 1] &&
                    origin[lastIndex - 1].insert === this.titleCase(this.lastHash.hash))
            )
                this.createMode = false;
        }

        let i = 0;
        let offset = 0;

        while (origin[i]) {
            const d = origin[i];
            if (d.attributes) {
                if (d.attributes.color === 'white' || d.attributes.colr === 'black') {
                    const placeholder = this.tags.find(({ hash }) => hash === d.insert);
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
        let variables = FindVariables(inset, this.tagTitles);
        offset = 0;
        for (let variable of variables) {
            if (variable.name[0] === '#') {
                const placeholder = this.tags.find(({ hash }) => hash === variable.name);
                if (placeholder) {
                    const delta = { ops: [] };
                    const title = this.titleCase(placeholder.hash);
                    const off = title.length - variable.name.length;
                    delta.ops.push(
                        { retain: variable.index - offset },
                        { delete: variable.name.length },
                        { insert: title + ' ' }
                    );
                    if (variable.index - offset === 0) delta.ops.shift();
                    quill.updateContents(delta);
                    offset += off;
                }
                break;
            }
        }
        if (offset < 0) return;

        for (let variable of variables) {
            const tag = this.getTag(variable.name);
            quill.formatText(
                variable.index,
                variable.index + variable.name.length,
                tag
                    ? this.getTagStyle(tag.color)
                    : {
                          color: '#000',
                          background: 'transparent'
                      },
                'silent'
            );

            quill.formatText(
                variable.index + variable.name.length,
                variable.index + variable.name.length + 1,
                {
                    color: '#000',
                    background: 'transparent'
                },
                'silent'
            );
        }
    }

    loadAudit() {
        if (this.candidate.audit && this.candidate.audit[this.job.id]) {
            this.auditData = this.candidate.audit[this.job.id];
            this.audit = this.transformAudit(this.auditData);
        } else {
            this.audit = this.transformAudit([]);
        }
    }

    transformAudit(auditData: any[]) {
        const creationEntry = auditData.find((e) => e.type === 'created');
        if (!creationEntry) {
            // let created_app = this.candidate.applicaitons[this.job.id].created_at;
            let created_app = this.candidate.assignments[this.job.id].find((a) => a.type === 'questions');
            auditData.push({
                type: 'created',
                created_at:
                    created_app && created_app.added_at
                        ? created_app.added_at * 1000
                        : this.candidate.created_at * 1000,
                source: this.candidate.source
            });
        }

        const result = [];
        auditData.forEach((e) => {
            e.created_at_rel = this.utilities.fromNow(e.created_at);
            e.job_title = this.job.title;
            e.candidate_name = this.candidate.first_name + ' ' + this.candidate.last_name;
            if (e.type === 'comment' || e.type === 'tags') {
                const author = this.users.find((u) => u.id === e.user_id);
                if (author) {
                    e.user = author;
                    e.image_url = author.icon_url || null;

                    result.push(e);
                }
            } else if (e.type === 'stages_progress') {
                const author = this.users.find((u) => u.id === e.user_id);
                if (author) {
                    e.user = author;
                    e.image_url = author.icon_url || null;
                }
                const stages = this.job.stages;
                const stage_from = stages.find((s) => s.id === e.stage_from_id);
                const stage_to = stages.find((s) => s.id === e.stage_to_id);
                e.stage_from_title = (stage_from && stage_from.title) || 'Applied';
                e.stage_to_title = (stage_to && stage_to.title) || 'Applied';

                if (e.user && e.stage_from_title && e.stage_to_title) {
                    result.push(e);
                }
            } else {
                result.push(e);
            }
        });
        return result.sort((a: any, b: any) => b.created_at - a.created_at);
    }

    getTags(text) {
        if (typeof text === 'string') {
            return JSON.parse(text);
        }
        return text;
    }

    async onSaveComment() {
        if (this.commentForm.valid) {
            const visits = {};
            (this.candidate.tags || []).forEach(({ hash }) => (visits[hash] = true));
            const { ops: origin } = this.quill.getContents();
            const description = this.commentForm.value.description.replace(/<p>/i, '').replace(/<\/p>/i, '');
            const newTags = [];
            origin.forEach(({ insert: word }) => {
                const hashIndex = this.tags.findIndex(({ hash }) => this.titleCase(hash) === word || hash === word);
                if (hashIndex !== -1 && !visits[this.tags[hashIndex].hash]) {
                    visits[this.tags[hashIndex].hash] = true;
                    newTags.push(this.tags[hashIndex]);
                }
            });
            const tags = this.newHashes;
            if (tags.length > 0) {
                await new Promise((resolve, reject) => {
                    this.jobService
                        .updateJobTags(this.job.id, [...(this.job.tags || []), ...tags])
                        .subscribe(resolve, (err) => {
                            this.toastr.error(err.message);
                            reject(err);
                        });
                });
                this.job.tags ? this.job.tags.push(...tags) : (this.job.tags = tags);
            }
            if (newTags.length > 0) {
                await new Promise((resolve, reject) => {
                    this.jobService
                        .updateCandidateTags(this.job.id, this.candidate.id, {
                            tags: [...(this.candidate.tags || []), ...newTags]
                        })
                        .subscribe(resolve, (err) => {
                            this.toastr.error(err.message);
                            reject(err);
                        });
                });
                const comment = {
                    id: this.utilities.generateUID(10).toLowerCase(),
                    text: JSON.stringify(newTags),
                    param: 'added',
                    created_at: new Date().getTime(),
                    user_id: this.user.id,
                    type: 'tags'
                };
                this.newHashes = [];
                this.lastHash = null;
                this.currentHash = '';
                this.createMode = false;
                this.candidate.tags ? this.candidate.tags.push(...newTags) : (this.candidate.tags = newTags);
                this.candidateService.addToAudit(this.job.id, this.candidate.id, comment).subscribe(
                    (response) => {
                        this.commentForm.reset();
                        this.auditData.push(comment);
                        this.audit = this.transformAudit(this.auditData);
                    },
                    (errorResponse) => {
                        console.error(errorResponse);
                    }
                );
            } else if (newTags.length === 0) {
                const comment = {
                    id: this.utilities.generateUID(10).toLowerCase(),
                    text: description,
                    created_at: new Date().getTime(),
                    user_id: this.user.id,
                    type: 'comment'
                };
                this.candidateService.addToAudit(this.job.id, this.candidate.id, comment).subscribe(
                    (response) => {
                        this.commentForm.reset();
                        this.auditData.push(comment);
                        this.audit = this.transformAudit(this.auditData);
                    },
                    (errorResponse) => {
                        console.error(errorResponse);
                    }
                );
            }
        }
    }

    ngOnDestroy() {
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }
    }
}
