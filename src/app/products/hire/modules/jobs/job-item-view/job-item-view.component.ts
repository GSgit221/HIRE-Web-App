import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilitiesService } from '@app/core/services';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of, Subscription } from 'rxjs';

import { Candidate, EmailTemplate, Job, Stage, User } from '../../../../../core/models';
import { CandidateService, EmailService, JobService, QuestionnaireService } from '../../../../../core/services';
import * as fromStore from '../../../../../store';
import * as fromJobsStore from '../store';
import * as fromJobsStoreActions from '../store/actions/jobCandidates.action';
import * as fromJobCandiatesSelector from '../store/selectors/jobCandidates.selector';
import * as fromSelectors from './../../../../../store/selectors';

interface IColumnSelection {
    columnId: string;
    candidates: object;
}

interface ISelect {
    label?: string;
    value: number | string;
}

@Component({
    selector: 'app-job-item-view',
    templateUrl: './job-item-view.component.html',
    styleUrls: ['./job-item-view.component.scss']
})
export class JobItemViewComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() job: Job;
    @Output() setEditMode = new EventEmitter<boolean>();
    @ViewChild('stageInput') stageInput: ElementRef;
    initialLoad = false;
    contentLoading = false;
    newJobStageForm: FormGroup;
    formIsSaving = false;
    stageFormIsSaving = false;
    appliedStage: Stage;
    stages: Stage[] = [];
    user: User;
    users: User[] = [];
    createStageMode = false;
    createCandidateMode = false;
    uploadQueue: any[] = [];
    uploadError: string;
    droppedFiles: File[] = [];
    candidates: Candidate[];
    draggedCandidate: Candidate;
    draggedFromStage: any = null;
    appliedCandidates: any = {
        visible: [],
        hidden: [],
        total: 0
    };
    resumeThreshold = 60;
    candidateIsDragged = false;
    draggedStage: any;
    href: any;
    showTick: boolean = false;
    showCopyBoard: boolean = true;
    baseUrl: string;
    showMore = false;
    selection: IColumnSelection = {
        columnId: 'applied',
        candidates: {}
    };
    emailTemplates: ISelect[];
    declineModalVisible: boolean = false;
    declineModalForm: FormGroup;
    modalSubmission: object = {};
    emailModalVisible: boolean = false;
    candidatesByStage = {};

    usersSubscription: Subscription;
    userSubscription: Subscription;
    candidatesSubscription: Subscription;

    questions: any[] = [];
    videoInterviewQuestions: any[] = [];
    videos: any = {};
    personalityAssessments: any = {};
    questionsAnswers: any = {};

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private jobService: JobService,
        private candidateService: CandidateService,
        private emailService: EmailService,
        private questionnaireService: QuestionnaireService,
        private toastr: ToastrService,
        private store: Store<fromStore.State>,
        private jobsStore: Store<fromJobsStore.JobsState>,
        private utilities: UtilitiesService
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
    }

    ngOnInit() {
        // Get user and users
        this.usersSubscription = this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.users = [...users];
        });
        this.userSubscription = this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = user;
            if (this.user) {
                console.log('🎩', this.user);
            }
        });

        this.resetSelection();
        this.newJobStageForm = this.fb.group({
            title: ['']
        });
        this.appliedStage = this.job.stages.find((stage) => stage.id === 'applied');
        this.stages = this.job.stages.filter((stage) => stage.id !== 'applied').sort((a, b) => a.order - b.order);

        // Get candidates
        this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
        this.candidatesSubscription = this.jobsStore
            .pipe(select(fromJobCandiatesSelector.getJobCandidates, { jobId: this.job.id }))
            .subscribe((candidates: any) => {
                console.log('Candidates were loaded:', candidates);
                this.initialLoad = true;
                this.contentLoading = false;
                this.candidates = candidates.map(this._isDD);
                this.groupCandidatesByStage();
                this.setAppliedCanidates(this.candidates);

                // Get job
                const jobRequest = this.questionnaireService.getQuestions(this.job.questionnaire);
                const getVideoQuestions = this.questionnaireService.getVideoQuestions();
                const getAllData = forkJoin([jobRequest, getVideoQuestions]).subscribe((response: any) => {
                    const questions = response[0];
                    const videoInterviewQuestions = response[1];
                    if (videoInterviewQuestions) {
                        this.videoInterviewQuestions = videoInterviewQuestions;
                    }
                    if (questions) {
                        this.questions = questions;
                        this.prepareQuestionsAnswers();
                    }

                    // After all data is loaded
                    // Attachments
                    this.candidates.forEach((candidate) => {
                        this.videos[candidate.id] = [];
                        // Get assessments
                        if (candidate.stages_data && candidate.stages_data[this.job.id]) {
                            const stagesData = candidate.stages_data[this.job.id];
                            for (const stageId in stagesData) {
                                const stage = this.stages.find(({ id }) => id === stageId);
                                if (stagesData.hasOwnProperty(stageId)) {
                                    const stageData = stagesData[stageId];
                                    if (stage.assessment && stage.assessment.length > 0) {
                                        this.personalityAssessments[candidate.id] = true;
                                        stage.assessment.forEach(({ type }) => {
                                            if (!this.personalityAssessments[candidate.id]) return;
                                            if (type === 'personality' && !stageData.personality_assessment)
                                                this.personalityAssessments[candidate.id] = false;
                                            if (
                                                type === 'video-interview' &&
                                                (!stageData.videos || !stageData.videos.completed)
                                            )
                                                this.personalityAssessments[candidate.id] = false;
                                        });
                                    } else {
                                        this.personalityAssessments[candidate.id] = true;
                                    }
                                    console.log(candidate, stageData);
                                } else {
                                    this.personalityAssessments[candidate.id] = !(
                                        stage.assessment && stage.assessment.length > 0
                                    );
                                }
                            }
                        }
                    });
                });
            });

        // Resume treshhold
        this.resumeThreshold = this.getJobResumeMatchingThreshold();

        // Application link
        this.href = `${environment.applicationPortalUrl}/tenant/${this.utilities.getTenant()}/applications/${
            this.job.id
        }/resume`;

        // Email templates
        this.emailService.findAll().subscribe((emailTemplates: EmailTemplate[]) => {
            console.log('Email templates:', emailTemplates);
            if (emailTemplates && emailTemplates.length) {
                this.emailTemplates = emailTemplates
                    .filter(({ type }) => type && type.indexOf('decline_template_') !== -1)
                    .map(({ id, title }) => ({ value: id, label: title }));
            }
        });

        // Decline modal
        this.declineModalForm = this.fb.group({
            emailTemplate: [null, Validators.required]
        });
    }

    ngAfterViewInit() {}

    get isHiringManager() {
        if (!this.user) return true;
        return this.user.role === 'hiring_manager';
    }

    prepareQuestionsAnswers() {
        this.candidates.forEach((candidate) => {
            if (this.job && candidate && this.questions) {
                const questionsAnswers = [];
                let isKnockout = false;
                const candidateQuestions =
                    candidate.job_specific &&
                    candidate.job_specific.questions &&
                    candidate.job_specific.questions[this.job.id]
                        ? candidate.job_specific.questions[this.job.id]
                        : null;
                this.questions.forEach((q) => {
                    const obj = {
                        isKnockout: ''
                    };
                    function applyKnockout(answer) {
                        if (answer.is_knockout !== undefined && this.isKnockout !== 'knockout wrong') {
                            this.isKnockout = !answer.is_knockout ? 'knockout' : 'knockout wrong';
                            if (!isKnockout && answer.is_knockout) isKnockout = true;
                        }
                    }
                    if (candidateQuestions && candidateQuestions[q.id]) {
                        if (q.answers) {
                            if (Array.isArray(candidateQuestions[q.id])) {
                                candidateQuestions[q.id].forEach((qa) => {
                                    const answer = q.answers.find((a) => a.id === qa);
                                    if (answer) {
                                        applyKnockout.call(obj, answer);
                                    }
                                });
                            } else {
                                const qa = candidateQuestions[q.id];
                                const answer = q.answers.find((a) => a.id === qa);
                                if (answer) {
                                    applyKnockout.call(obj, answer);
                                }
                            }
                        }
                    }
                    questionsAnswers.push(obj);
                });
                this.questionsAnswers[candidate.id] = isKnockout;
            }
        });
    }

    resetSelection() {
        this.selection = {
            columnId: 'applied',
            candidates: {}
        };
    }

    onJobStatusChange(event, item) {
        const status = event ? 'LIVE' : 'BUILD';
        this.jobService.updateJob(item.id, { status }).subscribe(() => {
            console.log(`Job <${item.id}> status updated`);
            item.status = status;
        });
    }

    copyURL(val: string) {
        val = `${environment.jobsPortalUrl}/jobs/${this.job.id}`;
        console.log(val);
        this.showTick = true;
        this.showCopyBoard = false;
        setTimeout(() => {
            this.showCopyBoard = true;
            this.showTick = false;
        }, 1500);
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toastr.success('The link has been copied to the dashboard.');
    }

    stageCandidates(stageName: string) {
        if (this.candidates && this.candidates.length) {
            const sC: Candidate[] = [];
            this.candidates.forEach((c) => {
                if (c.stage && c.stage[this.job.id]) {
                    if (c.stage[this.job.id] === stageName) {
                        sC.push(c);
                    }
                } else {
                    if (stageName === 'applied') {
                        sC.push(c);
                    }
                }
            });
            // console.log('return stage candidates', stageName);
            return sC;
        } else {
            return [];
        }
    }

    groupCandidatesByStage() {
        console.time('group');
        this.candidatesByStage = {};
        this.candidates.forEach((c) => {
            if (c.stage && c.stage[this.job.id]) {
                const stageName = c.stage[this.job.id];
                if (!this.candidatesByStage[stageName]) {
                    this.candidatesByStage[stageName] = [];
                }
                this.candidatesByStage[stageName].push({
                    resume_file: c.resume_file,
                    resume_file_new: c.resume_file_new,
                    application_completed: c.application_completed,
                    markedAsUnsuccessful: c.markedAsUnsuccessful,
                    score: c.score,
                    profile_image: c.profile_image,
                    id: c.id,
                    email: c.email,
                    employment_history: c.employment_history,
                    created_at_rel: c.created_at_rel,
                    updated_at_rel: c.updated_at_rel,
                    first_name: c.first_name,
                    last_name: c.last_name,
                    read: c.read.findIndex((jId) => jId === this.job.id) !== -1,
                    tags: c.tags,
                    questions: c.questions,
                    job_specific: c.job_specific || {},
                    stage: c.stage || {},
                    stages_data: c.stages_data || {}
                });
            }
        });
        console.timeEnd('group');
    }

    setAppliedCanidates(candidates: Candidate[]) {
        console.log('set applied candidates');
        console.time('set');
        const sC: Candidate[] = [];
        candidates.forEach((c) => {
            if (c.stage && c.stage[this.job.id]) {
                if (c.stage[this.job.id] === 'applied') {
                    sC.push(c);
                }
            } else {
                sC.push(c);
            }
        });

        const applied = {
            visible: [],
            hidden: [],
            total: sC.length
        };
        sC.forEach((c) => {
            if (this.job.pool) {
                applied.visible.push(c);
            } else {
                if (c.score >= this.resumeThreshold - 15 || this.showMore) {
                    applied.visible.push(c);
                } else {
                    applied.hidden.push(c);
                }
            }
        });
        this.appliedCandidates = applied;
        this.resetSelection();
        console.timeEnd('set');
    }

    onLoadMore() {
        const items = this.appliedCandidates.hidden.splice(0, this.appliedCandidates.hidden.length);
        this.appliedCandidates.visible = [...this.appliedCandidates.visible, ...items];
        this.showMore = true;
    }

    onLoadLess() {
        this.showMore = false;
        this.setAppliedCanidates(this.candidates);
    }

    onCandidateClick(columnId: string, candidateId: string) {
        if (this.hasSelection(columnId)) {
            this.onCandidateSelect(columnId, candidateId);
        } else {
            const { read } = this.candidates.find(({ id }) => id === candidateId);
            if (this.hasRead(read)) {
                this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.job.id}/candidate/${candidateId}`);
            } else {
                this.contentLoading = true;
                this.jobService.readCandidate(this.job.id, candidateId, [...read, this.job.id]).subscribe(() => {
                    this.contentLoading = false;
                    console.log('Read Candidate:', candidateId);
                    this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.job.id}/candidate/${candidateId}`);
                });
            }
        }
    }

    onSettigsClick(stageId: string) {
        this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.job.id}/stages/${stageId}`);
    }

    onEditJobClick(event) {
        event.preventDefault();
        this.setEditMode.emit(true);
    }

    onAddCandidateClick() {
        this.createCandidateMode = true;
    }

    onStageNameKeydown(event) {
        if (event && event.keyCode && event.keyCode === 13) {
            this.onNewJobStageFormSubmit();
        }
    }

    onNewJobStageFormSubmit() {
        const formValue = this.newJobStageForm.value;
        if (formValue && formValue.title && formValue.title.length) {
            this.stageFormIsSaving = true;
            this.jobService.createStage(this.job.id, formValue).subscribe(
                (stage: Stage) => {
                    this.stages.push(stage);
                    this.stageFormIsSaving = false;
                    this.newJobStageForm.reset();
                    this.createStageMode = false;
                },
                (error) => {
                    this.stageFormIsSaving = false;
                    console.error(error);
                }
            );
        }
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    onAddHiringManagerClick(event) {
        event.preventDefault();
        this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.job.id}?section=hiring-team&editMode=true`);
    }

    onFinishedCandidatesCreation(event) {
        this.contentLoading = true;
        this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
        this.createCandidateMode = false;
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        if (this.droppedFiles && this.droppedFiles.length) {
            this.createCandidateMode = true;
        }
    }

    onDeleteCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.contentLoading = true;
        this.jobService.deleteCandidate(this.job.id, candidateId).subscribe(() => {
            this.contentLoading = false;
            this.jobsStore.dispatch(new fromJobsStoreActions.DeleteJobCandidate({ jobId: this.job.id, candidateId }));
            this.groupCandidatesByStage();
            const index = this.candidates.findIndex((c) => c.id === candidateId);
            this.candidates.splice(index, 1);

            const visibleIndex = this.appliedCandidates.visible.findIndex((c) => c.id === candidateId);
            this.appliedCandidates.visible.splice(visibleIndex, 1);

            this.appliedCandidates.total = this.appliedCandidates.visible.length + this.appliedCandidates.hidden.length;
        });
    }

    onDeletingCandidate(loading) {
        console.log('onDeletingCandidate', loading);
        this.contentLoading = loading;
    }

    onDeletedCandidate(candidateId) {
        console.log('onDeletedCandidate', candidateId);
        this.contentLoading = false;
        const index = this.candidates.findIndex((c) => c.id === candidateId);
        this.candidates.splice(index, 1);

        const visibleIndex = this.appliedCandidates.visible.findIndex((c) => c.id === candidateId);
        this.appliedCandidates.visible.splice(visibleIndex, 1);

        this.appliedCandidates.total = this.appliedCandidates.visible.length + this.appliedCandidates.hidden.length;

        this.jobsStore.dispatch(new fromJobsStoreActions.DeleteJobCandidate({ jobId: this.job.id, candidateId }));
        this.groupCandidatesByStage();
    }

    onCandidateDrop(event, stageId) {
        // console.log('drop', event.dragData, stageId);
        this.candidateIsDragged = false;
        const candidate = event.dragData;
        const candidateIndex = this.candidates.findIndex((c) => c.id === candidate.id);
        if (!this.candidates[candidateIndex].stage) {
            this.candidates[candidateIndex].stage = { [this.job.id]: 'applied' };
        }
        const stageFromId = this.candidates[candidateIndex].stage[this.job.id] || 'applied';
        const stageToId = stageId;
        if (stageFromId !== stageToId) {
            this.contentLoading = true;
            const { stage, read: originRead } = this.candidates[candidateIndex];
            const read = this.hasRead(originRead) ? [...originRead] : [...originRead, this.job.id];
            stage[this.job.id] = stageId;

            this.jobService.updateCandidateStage(this.job.id, candidate.id, { stage, read }).subscribe(() => {
                if (!this.hasRead(originRead)) {
                    originRead.push(this.job.id);
                }
                this.contentLoading = false;
                console.log('Candidate stage was updated to:', stageId);
                this.candidateService
                    .addToAudit(this.job.id, candidate.id, {
                        type: 'stages_progress',
                        user_id: this.user.id,
                        stage_from_id: stageFromId,
                        stage_to_id: stageToId,
                        created_at: new Date().getTime()
                    })
                    .subscribe(
                        (response) => {
                            console.log(response);
                        },
                        (errorResponse) => {
                            console.error(errorResponse);
                        }
                    );
            });
        }
        this.groupCandidatesByStage();
        this.setAppliedCanidates(this.candidates);
    }

    getJobResumeMatchingThreshold() {
        let threshold = 60;
        if (this.job && this.job.stages && this.job.stages.find((s) => s.id === 'applied')) {
            const appliedStage = this.job.stages.find((s) => s.id === 'applied');
            threshold = appliedStage.resume_matching_threshold;
        }
        return threshold;
    }

    onCandidateDragStart(candidate, stageId) {
        this.candidateIsDragged = true;
        console.log('candidate', candidate, stageId);
        this.draggedFromStage = stageId;
    }

    onCandidateDragEnd(candidate, stageId) {
        this.candidateIsDragged = false;
        this.draggedFromStage = null;
    }

    onStageDragStart(stage) {
        this.draggedStage = stage;
    }

    onStageDragEnd() {
        this.draggedStage = null;
    }

    isDraggedFromStage(stageId) {
        return stageId === this.draggedFromStage;
    }

    onStageDragOver(event, order) {
        if (order !== this.draggedStage.order) {
            const draggedOverStageIndex = this.stages.findIndex((s) => s.order === order);
            const draggedStageIndex = this.stages.findIndex((s) => s.order === this.draggedStage.order);
            this.stages.splice(draggedStageIndex, 1);
            this.stages.splice(draggedOverStageIndex, 0, this.draggedStage);
            this.stages.forEach((s, index) => {
                s.order = index + 1;
            });

            this.jobService
                .updateStages(this.job.id, this.stages)
                .subscribe(
                    () => console.log('Stages order was updated'),
                    (errorResponse) => console.error(errorResponse)
                );
        }
    }

    onCandidateDeleteDrop(event) {
        const deleteItem = event.dragData;
        if (deleteItem) {
            this.onDeleteCandidateClick(event.nativeEvent, deleteItem.id);
        }
    }

    onCandidateSelect(columnId: string, candidateId: string): void {
        if (this.hasSelection(columnId)) {
            if (this.selection.candidates[candidateId]) {
                delete this.selection.candidates[candidateId];
            } else {
                this.selection.candidates[candidateId] = true;
            }
        } else {
            this.selection = {
                columnId,
                candidates: {
                    [candidateId]: true
                }
            };
        }
    }

    hasSelection(columnId: string) {
        return columnId === this.selection.columnId ? Object.keys(this.selection.candidates).length : 0;
    }

    get selectionEmails(): any[] {
        const {
            selection: { candidates: ids },
            candidates
        } = this;
        return Object.keys(ids).map((id) => {
            const { id: matchId, first_name, last_name, email } = candidates.find(({ id: cId }) => id === cId);
            return [matchId, { first_name, last_name, email }];
        });
    }

    hasRead(read: string[]) {
        const jobId = this.job.id;
        return read.findIndex((jId) => jId === jobId) !== -1;
    }

    isLastStage(stageId: string) {
        const stageIndex = this.stages.findIndex(({ id }) => id === stageId);
        return stageIndex === this.stages.length - 1;
    }

    isValidField(form, key) {
        return !this[form].get(key).valid && this.modalSubmission[form];
    }

    async onSelectionDecline() {
        if (this.declineModalForm.valid) {
            const { emailTemplate: emailTemplateId } = this.declineModalForm.value;
            const {
                job: { id: jobId },
                selection: { candidates }
            } = this;
            const candidateIds = Object.keys(candidates);

            this.contentLoading = true;
            for (let candidateId of candidateIds) {
                await new Promise((res, rej) =>
                    this.jobService.deleteCandidate(jobId, candidateId, emailTemplateId).subscribe(() => {
                        console.log(`Candidate <${candidateId}> was declined`);
                        const index = this.candidates.findIndex(({ id }) => id === candidateId);
                        this.candidates.splice(index, 1);

                        const visibleIndex = this.appliedCandidates.visible.findIndex(({ id }) => id === candidateId);
                        this.appliedCandidates.visible.splice(visibleIndex, 1);

                        this.appliedCandidates.total =
                            this.appliedCandidates.visible.length + this.appliedCandidates.hidden.length;
                        res(candidateId);
                    }, rej)
                );
            }

            this.contentLoading = false;
            this.onShowModal(false);
            this.groupCandidatesByStage();
            this.setAppliedCanidates(this.candidates);
        } else {
            this.modalSubmission['declineModalForm'] = true;
        }
    }

    async onSelectionProgress() {
        const {
            job: { id: jobId },
            user: { id: userId },
            selection: { columnId, candidates }
        } = this;
        const candidateIds = Object.keys(candidates);

        const columnIndex = this.stages.findIndex(({ id }) => id === columnId);
        const { id: fromId = 'applied' } = columnIndex === -1 ? { id: 'applied' } : this.stages[columnIndex];
        const { id: toId, title } = this.stages[columnIndex + 1];

        this.contentLoading = true;
        for (let candidateId of candidateIds) {
            const { stage, read: originRead } = this.candidates.find(({ id }) => id === candidateId);
            const read = this.hasRead(originRead) ? [...originRead] : [...originRead, this.job.id];
            stage[jobId] = toId;

            await new Promise((res, rej) =>
                this.jobService.updateCandidateStage(jobId, candidateId, { stage, read }).subscribe(() => {
                    if (!this.hasRead(originRead)) {
                        originRead.push(this.job.id);
                    }
                    console.log(`Candidate <${candidateId}> was progressed to - ${title}`);
                    this.candidateService
                        .addToAudit(jobId, candidateId, {
                            type: 'stages_progress',
                            user_id: userId,
                            stage_from_id: fromId,
                            stage_to_id: toId,
                            created_at: new Date().getTime()
                        })
                        .subscribe(
                            (response) => {
                                res(response);
                            },
                            (errorResponse) => {
                                rej(errorResponse);
                            }
                        );
                })
            );
        }

        this.contentLoading = false;
        this.groupCandidatesByStage();
        this.setAppliedCanidates(this.candidates);
    }

    onShowModal(visible = true) {
        if (visible) {
            this.declineModalForm.reset();
            delete this.modalSubmission['declineModalForm'];
        }
        this.declineModalVisible = visible;
    }

    onShowEmailModal(visible: boolean = true) {
        this.emailModalVisible = visible;
    }

    onCreateStage() {
        this.createStageMode = true;
        setTimeout(() => {
            this.stageInput.nativeElement.focus();
        }, 1);
    }

    _isDD(c) {
        if (c.email.indexOf('dimensiondata') !== -1) {
            c.isDdEmployee = true;
        }
        if (
            c.employment_history &&
            c.employment_history.length &&
            c.employment_history[0].end_date &&
            c.employment_history[0].end_date.toLowerCase() === 'current'
        ) {
            if (
                c.employment_history[0].title.toLowerCase().indexOf('dimension data') !== -1 ||
                c.employment_history[0].company.toLowerCase().indexOf('dimension data') !== -1
            ) {
                c.isDdEmployee = true;
            }
        }
        if (!c.read) c.read = [];
        return c;
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }

        if (this.candidatesSubscription) {
            this.candidatesSubscription.unsubscribe();
        }
    }

    onBackClick() {
        this.router.navigateByUrl(`${this.baseUrl}/jobs`);
    }
}
