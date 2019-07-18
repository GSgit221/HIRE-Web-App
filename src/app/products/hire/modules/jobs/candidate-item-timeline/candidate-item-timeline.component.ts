import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Candidate } from '../../../../../core/models/candidate';
import { Job } from './../../../../../core/models/job';

import { User } from '../../../../../core/models/user';
import { CandidateService } from '../../../../../core/services/candidate.service';
import { UserService } from '../../../../../core/services/user.service';
import { UtilitiesService } from '../../../../../core/services/utilities.service';
import * as fromStore from './../../../../../store';
import * as fromSelectors from './../../../../../store/selectors';

@Component({
    selector: 'app-candidate-item-timeline',
    templateUrl: './candidate-item-timeline.component.html',
    styleUrls: ['./candidate-item-timeline.component.scss']
})
export class CandidateItemTimelineComponent implements OnInit {
    @Input() job: Job;
    @Input() candidate: Candidate;
    user: User;
    users: User[];

    commentForm: FormGroup;
    contentLoading = false;
    auditData: any[] = [];
    audit = [];

    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private userService: UserService,
        private store: Store<fromStore.State>,
        private utilities: UtilitiesService
    ) {}

    ngOnInit() {
        this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = user;
            this.loadAudit();
        });
        this.commentForm = this.fb.group({
            description: ['', Validators.required]
        });
    }

    loadAudit() {
        this.userService.getUsers().subscribe((users: User[]) => {
            this.users = users;
            if (this.candidate.audit && this.candidate.audit[this.job.id]) {
                this.auditData = this.candidate.audit[this.job.id];
                this.audit = this.transformAudit(this.auditData);
            } else {
                this.audit = this.transformAudit([]);

                console.log(this.audit);
            }
        });
    }

    transformAudit(auditData: any[]) {
        const creationEntry = auditData.find((e) => e.type === 'created');
        if (!creationEntry) {
            auditData.push({
                type: 'created',
                created_at: this.candidate.created_at * 1000,
                source: this.candidate.source
            });
        }

        const result = [];
        auditData.forEach((e) => {
            e.created_at_rel = this.utilities.fromNow(e.created_at);
            e.job_title = this.job.title;
            e.candidate_name = this.candidate.first_name + ' ' + this.candidate.last_name;
            if (e.type === 'comment') {
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
                e.stage_from_title = stage_from && stage_from.title;
                e.stage_to_title = stage_to && stage_to.title;

                if (e.user && e.stage_from_title && e.stage_to_title) {
                    result.push(e);
                }
            } else {
                result.push(e);
            }
        });
        return result.sort((a: any, b: any) => b.created_at - a.created_at);
    }

    onSaveComment() {
        console.log('onSaveComment');
        this.contentLoading = true;
        if (this.commentForm.valid) {
            const comment = {
                id: this.utilities.generateUID(10).toLowerCase(),
                text: this.commentForm.value.description,
                created_at: new Date().getTime(),
                user_id: this.user.id,
                type: 'comment'
            };
            this.candidateService.addToAudit(this.job.id, this.candidate.id, comment).subscribe(
                (response) => {
                    this.commentForm.reset();
                    this.contentLoading = false;
                    this.auditData.push(comment);
                    this.audit = this.transformAudit(this.auditData);
                },
                (errorResponse) => {
                    this.contentLoading = false;
                    console.error(errorResponse);
                }
            );
        }
    }
}
