import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; // CDK-Integration
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { Candidate, Job, Stage, User } from '../../../../../core/models';
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
    styleUrls: ['./job-item-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
    candidates: Candidate[] = [];
    // draggedFromStage: any = null;
    appliedCandidates: any = {
        visible: [],
        hidden: [],
        total: 0
    };
    appliedCandidatesArray: any = {
        visible: [],
        hidden: [],
        total: 0
    };
    resumeThreshold = 60;
    candidateIsDragged = false;
    // draggedStage: any;
    href: any;
    showTick: boolean = false;
    showCopyBoard: boolean = true;
    baseUrl: string;
    showMore = false;
    selection: IColumnSelection = {
        columnId: 'applied',
        candidates: {}
    };
    declineModalVisible: boolean = false;
    emailModalVisible: boolean = false;
    progressModalVisible: boolean = false;
    candidatesByStage = {};
    candidatesByStageArray = {};

    usersSubscription: Subscription;
    userSubscription: Subscription;
    candidatesSubscription: Subscription;

    questions: any[] = [];
    candidateQuestions: any = {};

    draggedCandidate: Candidate;
    droppedStage: string;
    confirmModalVisible: boolean = false;

    // CDK-Integration
    trashBin: any[] = [];
    cdkEvent: CdkDragDrop<any[]> = null;

    searchedValue = {
        visible: false,
        text: null
    };

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
        private utilities: UtilitiesService,
        private cdr: ChangeDetectorRef
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
    }

    ngOnInit() {
        // Application link
        this.href = `${environment.applicationPortalUrl}/tenant/${this.utilities.getTenant()}/applications/${
            this.job.id
        }/resume`;
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
        // Resume treshhold
        this.resumeThreshold = this.getJobResumeMatchingThreshold();

        this.resetSelection();
        this.newJobStageForm = this.fb.group({
            title: ['']
        });
        this.appliedStage = this.job.stages.find((stage) => stage.id === 'applied');
        this.stages = this.job.stages.filter((stage) => stage.id !== 'applied').sort((a, b) => a.order - b.order);

        // Get candidates
        // this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
        this.checkStoreForCandidates().subscribe(() => {
            console.log('Checked candidates loaded');
        });
        this.candidatesSubscription = this.jobsStore
            .pipe(select(fromJobCandiatesSelector.getJobCandidates, { jobId: this.job.id }))
            .subscribe((candidates: any) => {
                console.log('Job candidates:', candidates);
                this.initialLoad = true;
                this.contentLoading = false;
                // Get questions
                if (this.job.questions && this.job.questions.length) {
                    this.prepareQuestionsAnswers(candidates);
                }
                const trashIDs = this.trashBin.map(({ id }) => id);
                this.candidates = candidates
                    .filter(({ id }) => !trashIDs.includes(id))
                    .map((c) => this.prepareBlockData(c));
                this.groupCandidatesByStage();
                setTimeout(() => {
                    this.cdr.detectChanges();
                }, 1000);
            });

        this.candidateService.getSearchValueForCandidates().subscribe((r) => {
            if (r && r.length) {
                this.searchedValue = {
                    visible: true,
                    text: r
                };
                this.onLoadMore();
                for (var key in this.candidatesByStage) {
                    if (this.candidatesByStageArray.hasOwnProperty(key)) {
                        this.candidatesByStage[key] = this.candidatesByStageArray[key].filter((c) => {
                            if (c.first_name && c.last_name) {
                                const fullname = c.first_name.toLowerCase().trim() + ' ' + c.last_name.toLowerCase().trim();
                                const query = this.searchedValue.text.toLowerCase().trim();
                                const queryWords = query.split(' ').filter((word) => word);
                                const matched = queryWords.every((word) => fullname.indexOf(word) !== -1);
                                const emailIncluded = c.email.toLowerCase().includes(query);
                                return matched || emailIncluded;
                            } else {
                                false;
                            }
                        });
                    }
                }
                if (this.appliedCandidatesArray.hidden.length) {
                    this.appliedCandidatesArray.visible = [
                        ...this.appliedCandidatesArray.visible,
                        ...this.appliedCandidatesArray.hidden
                    ];
                    this.appliedCandidatesArray.hidden = [];
                }
                this.appliedCandidates.visible = this.appliedCandidatesArray.visible.filter((c) => {
                    if (c.first_name && c.last_name) {
                        const fullname = c.first_name.toLowerCase().trim() + ' ' + c.last_name.toLowerCase().trim();
                        const query = this.searchedValue.text.toLowerCase().trim();
                        const queryWords = query.split(' ').filter((word) => word);
                        const matched = queryWords.every((word) => fullname.indexOf(word) !== -1);
                        const emailIncluded = c.email.toLowerCase().includes(query);
                        return matched || emailIncluded;
                    } else {
                        false;
                    }
                });
                this.appliedCandidates.total = this.appliedCandidates.visible.length;
                this.cdr.markForCheck();
            } else {
                this.searchedValue = {
                    visible: false,
                    text: null
                };
                this.candidatesByStage = { ...this.candidatesByStageArray };
                this.appliedCandidates = { ...this.appliedCandidatesArray };
                this.cdr.markForCheck();
            }
        });
    }

    ngAfterViewInit() {}

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

    checkStoreForCandidates(): Observable<boolean> {
        return this.store.pipe(
            select(fromJobCandiatesSelector.getJobCandidatesLoaded, { jobId: this.job.id }),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }

    loadJobCandidates() {
        this.store.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
    }

    prepareQuestionsAnswers(candidates) {
        if (this.job && this.job.questions) {
            candidates.forEach((candidate) => {
                const candidateQ = {
                    hasAnswers: false,
                    isKnockout: false,
                    isExpired: false
                };

                let candidateQuestions = {};
                if (candidate.assignments) {
                    const assignment = (candidate.assignments[this.job.id] || []).find(
                        ({ type }) => type === 'questions'
                    );
                    if (assignment) {
                        candidateQ.hasAnswers = assignment.completed;
                        candidateQ.isExpired =
                            (assignment.expired_at ||
                                moment
                                    .unix(assignment.added_at)
                                    .add(7, 'days')
                                    .unix()) < moment().unix()
                                ? true
                                : false;
                        candidateQuestions = assignment.data;
                    }
                }

                if (candidateQ.hasAnswers && !candidateQ.isKnockout) {
                    this.job.questions.forEach((q) => {
                        let questionKnockout = '';
                        function applyKnockout(answer) {
                            if (answer.is_knockout !== undefined && questionKnockout !== 'knockout wrong') {
                                questionKnockout = !answer.is_knockout ? 'knockout' : 'knockout wrong';
                                if (!candidateQ.isKnockout && answer.is_knockout) candidateQ.isKnockout = true;
                            }
                        }
                        if (q.answers) {
                            if (Array.isArray(candidateQuestions[q.id])) {
                                candidateQuestions[q.id].forEach((qa) => {
                                    const answer = q.answers.find((a) => a.id === qa);
                                    if (answer) {
                                        applyKnockout(answer);
                                    }
                                });
                            } else {
                                const qa = candidateQuestions[q.id];
                                const answer = q.answers.find((a) => a.id === qa);
                                if (answer) {
                                    applyKnockout(answer);
                                }
                            }
                        }
                    });
                }
                this.candidateQuestions[candidate.id] = candidateQ;
            });
        }
    }

    prepareBlockData(candidate) {
        if (!candidate.stage) {
            candidate.stage = {};
        }
        if (!candidate.blockData) {
            candidate.blockData = {};
        }
        candidate.blockData.id = candidate.id;
        candidate.blockData.tags = candidate.tags;
        if (candidate.profile_image) {
            if (candidate.profile_image.includes('https://')) {
                candidate.profile_image_link = candidate.profile_image;
                candidate.blockData.profile_image_link = candidate.profile_image;
            } else {
                this.candidateService.getProfileImageLink(`${candidate.profile_image}&collection=Users`).subscribe(
                    (response: string) => {
                        candidate.profile_image_link = response;
                        candidate.blockData.profile_image_link = response;
                        setTimeout(() => {
                            this.cdr.detectChanges();
                        }, 200);
                    },
                    (errorResponse) => console.error(errorResponse)
                );
            }
        } else {
            candidate.blockData.profile_image = candidate.profile_image;
        }
        candidate.blockData.first_name = candidate.first_name;
        candidate.blockData.last_name = candidate.last_name;
        candidate.blockData.email = candidate.email;
        candidate.blockData.score = candidate.score;

        candidate.blockData.hasRead = candidate.read ? candidate.read.includes(this.job.id) : false;

        candidate.blockData.employment_history =
            candidate.employment_history && candidate.employment_history[0] ? candidate.employment_history[0] : null;

        candidate.blockData.hasQuestionnaire = this.job.questionnaire ? true : false;
        candidate.blockData.jobId = this.job.id;

        candidate.blockData.complianceRateClass = this.getComplianceRateClass(candidate);
        candidate.blockData.questionsClass = this.getQuestionsClass(candidate);
        candidate.blockData.currentStageClass = this.getCurrentStageClass(candidate);
        return candidate;
    }

    getStageCompletion(candidate) {
        return this.getCurrentStageClass(candidate) !== 'grey';
    }

    getComplianceRateClass(candidate) {
        if (candidate.job_id) {
            const jobId = candidate.job_id.find((c) => c === this.job.id);
            if (jobId && candidate.opportunities) {
                let opportunities = candidate.opportunities.find((c) => c.jobId === jobId);
                if (opportunities && !opportunities.approved) {
                    return 'mellow';
                }
            }
        }
        if (candidate.hasUser && (candidate.hasUserReviewed || candidate.matching)) {
            let averageMin = this.resumeThreshold - this.resumeThreshold / 3;
            let averageMax = this.resumeThreshold;
            if (candidate.score >= averageMax || this.resumeThreshold === 0) {
                return 'green';
            } else if (candidate.score < averageMax && candidate.score >= averageMin) {
                return 'orange';
            } else {
                return 'red';
            }
            // if (candidate.score >= this.resumeThreshold) {
            //     return 'green';
            // } else if (candidate.score >= this.resumeThreshold - 15 && candidate.score < this.resumeThreshold) {
            //     return 'orange';
            // } else {
            //     return 'red';
            // }
        } else {
            return 'yellow';
        }
    }

    getQuestionsClass(candidate) {
        const _candidateQuestions = this.candidateQuestions[candidate.id];

        if (!_candidateQuestions || !candidate.hasUser) return 'grey';

        if ((candidate.hasUser && candidate.hasUserReviewed) || candidate.matching) {
            if (_candidateQuestions.hasAnswers) {
                return _candidateQuestions.isKnockout ? 'red' : 'green';
            } else {
                return _candidateQuestions.isExpired ? 'red' : 'grey';
            }
        } else {
            return _candidateQuestions.isExpired ? 'red' : 'grey';
        }
    }

    getCurrentStageClass(candidate) {
        //define stage
        if (candidate.stage && candidate.stage[this.job.id] && candidate.stage[this.job.id] !== 'applied') {
            const stageId = candidate.stage[this.job.id];

            const getAssignmentClass = (ass, stageAss) => {
                if (!ass) return 0;
                if (ass.completed) return 3;
                return (ass.expired_at ||
                    moment
                        .unix(ass.added_at)
                        .add(stageAss.deadline || 5, 'days')
                        .unix()) < moment().unix()
                    ? 1
                    : 0;
            };

            // need to check stages data
            if (this.job && this.job.stages && this.job.stages.find((s) => s.id === stageId)) {
                const stage = this.job.stages.find((s) => s.id === stageId);
                if (stage && stage.assessment && stage.assessment.length) {
                    if (
                        (candidate.stages_data &&
                            candidate.stages_data[this.job.id] &&
                            candidate.stages_data[this.job.id][stageId]) ||
                        (candidate.assignments &&
                            candidate.assignments[this.job.id] &&
                            candidate.assignments[this.job.id].find((ass) => ass.stageId === stageId))
                    ) {
                        const completed = [];
                        const stageData =
                            candidate.assignments &&
                            candidate.assignments[this.job.id] &&
                            candidate.assignments[this.job.id].filter((ass) => ass.stageId === stageId);
                        stage.assessment.forEach((ass) => {
                            const candidateAss = stageData.find(({ type }) => type === ass.type);
                            if (ass.type === 'personality') {
                                completed.push(getAssignmentClass(candidateAss, ass));
                            }
                            if (ass.type === 'video-interview') {
                                completed.push(getAssignmentClass(candidateAss, ass));
                            }

                            if (ass.type === 'logic-test') {
                                const logicTest = candidateAss;
                                if (logicTest && logicTest.score >= 0) {
                                    if (logicTest.score < 6) completed.push(1);
                                    else completed.push(logicTest.score >= 8 ? 3 : 2);
                                } else {
                                    completed.push(getAssignmentClass(logicTest, ass));
                                }
                            }

                            if (ass.type === 'devskiller') {
                                const devAss = candidateAss;
                                if (devAss && devAss.completed) {
                                    const score = (devAss.results.scoredPoints / devAss.results.maxPoints) * 100;
                                    if (score < 40) completed.push(1);
                                    else completed.push(score >= 60 ? 3 : 2);
                                } else {
                                    completed.push(getAssignmentClass(devAss, ass));
                                }
                            }
                        });
                        // console.log(candidate.id, candidate.first_name, completed);
                        return this._getClassFromValue(Math.min(...completed));
                    } else {
                        return 'grey';
                    }
                } else {
                    return 'green';
                }
            } else {
                return 'green';
            }
        } else {
            // APPLIED STAGE
            const complienceRate = this._getClassValue(this.getComplianceRateClass(candidate));
            const questionsStatus = this._getClassValue(this.getQuestionsClass(candidate));
            const values = [];
            values.push(complienceRate);
            if (this.job.questionnaire) {
                values.push(questionsStatus);
            }
            const minValue = Math.min(...values);
            return this._getClassFromValue(minValue);
        }
    }

    _getClassValue(className) {
        switch (className) {
            case 'green':
                return 3;
            case 'orange':
                return 2;
            case 'red':
                return 1;
            default:
                return 0;
        }
    }

    _getClassFromValue(value) {
        switch (value) {
            case 3:
                return 'green';
            case 2:
                return 'orange';
            case 1:
                return 'red';
            default:
                return 'grey';
        }
    }

    getJobResumeMatchingThreshold() {
        let threshold = 60;
        if (this.job && this.job.stages && this.job.stages.find((s) => s.id === 'applied')) {
            const appliedStage = this.job.stages.find((s) => s.id === 'applied');
            threshold = appliedStage.resume_matching_threshold;
        }
        return threshold;
    }

    get isHiringManager() {
        if (!this.user) return true;
        return this.user.role === 'hiring_manager';
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    resetSelection() {
        this.selection = {
            columnId: 'applied',
            candidates: {}
        };
    }

    hasRead(read: string[]) {
        const jobId = this.job.id;
        return read.findIndex((jId) => jId === jobId) !== -1;
    }

    isLastStage(stageId: string) {
        const stageIndex = this.stages.findIndex(({ id }) => id === stageId);
        return stageIndex === this.stages.length - 1;
    }

    copyURL(val: string) {
        val = `${environment.jobsPortalUrl}/jobs/${this.job.id}?fromApp=true`;
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

    // stageCandidates(stageName: string) {
    //     if (this.candidates && this.candidates.length) {
    //         const sC: Candidate[] = [];
    //         this.candidates.forEach((c) => {
    //             if (c.stage && c.stage[this.job.id]) {
    //                 if (c.stage[this.job.id] === stageName) {
    //                     sC.push(c);
    //                 }
    //             } else {
    //                 if (stageName === 'applied') {
    //                     sC.push(c);
    //                 }
    //             }
    //         });
    //         // console.log('return stage candidates', stageName);
    //         return sC;
    //     } else {
    //         return [];
    //     }
    // }

    groupCandidatesByStage(appliedOnly = false) {
        // console.time('set');
        const appliedCandidates = [];
        const stageCandidates = [];
        this.candidates.forEach((c) => {
            if (c.stage && c.stage[this.job.id]) {
                if (c.stage[this.job.id] === 'applied') {
                    appliedCandidates.push(c);
                } else {
                    stageCandidates.push(c);
                }
            } else {
                appliedCandidates.push(c);
            }
        });

        const applied = {
            visible: [],
            hidden: [],
            total: appliedCandidates.length
        };
        appliedCandidates.forEach((c) => {
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
        this.appliedCandidatesArray = { ...applied };

        // console.timeEnd('set');

        if (!appliedOnly) {
            // console.time('group');
            const candidatesByStage = {};
            this.stages.forEach(({ id }) => (candidatesByStage[id] = []));
            stageCandidates.forEach(({ stage, read, matching = null, ...candidate }) => {
                if (stage && stage[this.job.id]) {
                    const stageId = stage[this.job.id];
                    candidatesByStage[stageId].push({
                        ...candidate,
                        stage,
                        matching,
                        read: read.findIndex((jId) => jId === this.job.id) !== -1
                    });
                }
            });
            this.candidatesByStageArray = { ...candidatesByStage };

            this.candidatesByStage = candidatesByStage;
            // console.timeEnd('group');
        }
        this.resetSelection();
    }

    onJobStatusChange(event, item) {
        const status = event ? 'LIVE' : 'BUILD';
        this.jobService.updateJob(item.id, { status }).subscribe(() => {
            console.log(`Job <${item.id}> status updated`);
            item.status = status;
        });
    }

    onLoadMore() {
        this.appliedCandidates.visible = [...this.appliedCandidates.visible, ...this.appliedCandidates.hidden];
        this.appliedCandidates.hidden = [];
        this.showMore = true;
    }

    onLoadLess() {
        this.showMore = false;
        this.groupCandidatesByStage(true);
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

    onAddHiringManagerClick(event) {
        event.preventDefault();
        const id = this.utilities.generateUID(10);
        this.router.navigateByUrl(
            `${this.baseUrl}/jobs/${this.job.id}?section=hiring-team&editMode=true&sectionEditId=${id}`
        );
    }

    onFinishedCandidatesCreation(event) {
        this.contentLoading = true;
        this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.job.id));
        this.createCandidateMode = false;
        this.droppedFiles = [];
        this.cdr.detectChanges();
    }

    onDropFile(files) {
        console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        if (files && files.length) {
            this.createCandidateMode = true;
            this.cdr.detectChanges();
        }
    }

    onDragOverFile(e) {
        this.cdr.detectChanges();
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

    async onSelectionDecline() {
        const {
            job: { id: jobId },
            selection: { columnId, candidates }
        } = this;
        const candidateIds = Object.keys(candidates);

        this.onShowModal(false);
        if (this.cdkEvent && columnId === 'trash') {
            this.onCDKDrop(this.cdkEvent);
            this.cdkEvent = null;
        }

        this.contentLoading = true;
        for (let candidateId of candidateIds) {
            await new Promise((res, rej) =>
                this.jobService.deleteCandidate(jobId, candidateId).subscribe(() => {
                    console.log(`Candidate <${candidateId}> was declined`);
                    this.jobsStore.dispatch(new fromJobsStore.DeleteJobCandidate({ jobId, candidateId }));
                    res(candidateId);
                    this.jobsStore.dispatch(new fromJobsStore.DeleteJobCandidate({ jobId, candidateId }));
                }, rej)
            );
        }
        this.contentLoading = false;

        // this.loadJobCandidates();
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
        for (let candidateId of candidateIds) {
            const candidate = this.candidates.find(({ id }) => id === candidateId);
            if (
                candidate &&
                candidate.blockData &&
                (candidate.blockData.complianceRateClass === 'yellow' ||
                    candidate.blockData.complianceRateClass === 'mellow')
            ) {
                this.progressModalVisible = true;
                this.contentLoading = false;
                return false;
            }
        }

        this.contentLoading = true;
        for (let candidateId of candidateIds) {
            const candidate = this.candidates.find(({ id }) => id === candidateId);
            const { stage, read: originRead } = candidate;
            const read = this.hasRead(originRead) ? [...originRead] : [...originRead, this.job.id];
            stage[jobId] = toId;

            await new Promise((res, rej) =>
                this.jobService.updateCandidateStage(jobId, candidateId, { stage, read }).subscribe(() => {
                    if (!this.hasRead(originRead)) {
                        originRead.push(this.job.id);
                    }
                    this.prepareBlockData(candidate);
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
                                this.updateAuditForCandidate(candidate, fromId, toId);
                            },
                            (errorResponse) => {
                                rej(errorResponse);
                            }
                        );
                    this.updateAssessmentsForCandidate(candidate, stage[jobId]);
                })
            );
        }

        this.contentLoading = false;
        this.groupCandidatesByStage();
        this.cdr.detectChanges();
    }

    onShowModal(visible = true, modal = 'decline') {
        this[`${modal}ModalVisible`] = visible;
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

    onBackClick() {
        this.router.navigateByUrl(`${this.baseUrl}/jobs`);
    }

    // CDK-Integration Start
    errorCallback(error) {
        this.contentLoading = false;
        console.error(error);
    }

    successCallback(res, log = '') {
        this.contentLoading = false;
        console.log(log || res);
    }

    getCDKConnections(except) {
        return ['applied', ...this.stages.map(({ id }) => id), 'trash-bin'].filter((id) => id !== except);
    }

    onCDKDrop(event: CdkDragDrop<any[]>, callback = null) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
        if (callback) callback();
    }

    onStageDrop(event: CdkDragDrop<any[]>) {
        if (event.previousIndex !== event.currentIndex) {
            this.onCDKDrop(event, () => {
                this.stages.forEach((s, index) => {
                    s.order = index + 1;
                });
                this.contentLoading = true;
                this.jobService
                    .updateStages(this.job.id, this.stages)
                    .subscribe(
                        (value) => this.successCallback(value, 'Stages order was updated'),
                        (error) => this.errorCallback(error)
                    );
            });
        }
    }

    proceedCandidate() {
        this.confirmModalVisible = false;
        const candidate = this.draggedCandidate;
        const stageId = this.droppedStage;

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

            this.jobService
                .updateCandidateStage(this.job.id, candidate.id, { stage, read })
                .subscribe((response: any) => {
                    if (response.assignments) {
                        this.store.dispatch(
                            new fromJobsStore.UpdateJobCandidate({
                                jobId: this.job.id,
                                candidateId: candidate.id,
                                data: { assignments: response.assignments }
                            })
                        );
                        console.log('RESPONSE ASSIGNMENTS:', response.assignments);
                    }

                    if (!this.hasRead(originRead)) {
                        originRead.push(this.job.id);
                    }
                    this.prepareBlockData(this.candidates[candidateIndex]);
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
                                this.updateAuditForCandidate(candidate, stageFromId, stageToId);
                            },
                            (errorResponse) => {
                                console.error(errorResponse);
                            }
                        );

                    this.updateAssessmentsForCandidate(candidate, stageId);
                });
        }
        this.groupCandidatesByStage();
    }

    onCandidateDrop(event: CdkDragDrop<any[]>, stageId: string) {
        const candidate = event.item.data;
        if (stageId === (candidate.stage[this.job.id] || 'applied')) return this.onCDKDrop(event);

        this.draggedCandidate = candidate;
        this.droppedStage = stageId;

        if (this.getStageCompletion(candidate)) {
            this.proceedCandidate();
        } else {
            this.confirmModalVisible = true;
        }
    }

    onCandidateTrashDrop(event: CdkDragDrop<any[]>) {
        const candidate = event.item.data;
        this.selection = {
            columnId: 'trash',
            candidates: {
                [candidate.id]: true
            }
        };
        this.cdkEvent = event;
        this.onShowModal();
    }

    onCDKDragStarted(event) {
        this.candidateIsDragged = true;
    }

    onCDKDragEnded(event) {
        this.candidateIsDragged = false;
    }
    // CDK-Integration End

    // onCandidateDrop(event, stageId) {
    //     // console.log('drop', event.dragData, stageId);
    //     this.candidateIsDragged = false;
    //     const candidate = event.dragData;

    //     if (stageId === candidate.stage[this.job.id]) return;

    //     this.draggedCandidate = candidate;
    //     this.droppedStage = stageId;

    //     if (this.getStageCompletion(candidate)) {
    //         this.proceedCandidate();
    //     } else {
    //         this.confirmModalVisible = true;
    //     }
    // }

    // proceedCandidate() {
    //     this.confirmModalVisible = false;
    //     const candidate = this.draggedCandidate;
    //     const stageId = this.droppedStage;

    //     const candidateIndex = this.candidates.findIndex((c) => c.id === candidate.id);
    //     if (!this.candidates[candidateIndex].stage) {
    //         this.candidates[candidateIndex].stage = { [this.job.id]: 'applied' };
    //     }
    //     const stageFromId = this.candidates[candidateIndex].stage[this.job.id] || 'applied';
    //     const stageToId = stageId;
    //     if (stageFromId !== stageToId) {
    //         this.contentLoading = true;
    //         const { stage, read: originRead } = this.candidates[candidateIndex];
    //         const read = this.hasRead(originRead) ? [...originRead] : [...originRead, this.job.id];
    //         stage[this.job.id] = stageId;

    //         this.jobService.updateCandidateStage(this.job.id, candidate.id, { stage, read }).subscribe(() => {
    //             if (!this.hasRead(originRead)) {
    //                 originRead.push(this.job.id);
    //             }
    //             this.contentLoading = false;
    //             console.log('Candidate stage was updated to:', stageId);
    //             this.candidateService
    //                 .addToAudit(this.job.id, candidate.id, {
    //                     type: 'stages_progress',
    //                     user_id: this.user.id,
    //                     stage_from_id: stageFromId,
    //                     stage_to_id: stageToId,
    //                     created_at: new Date().getTime()
    //                 })
    //                 .subscribe(
    //                     (response) => {
    //                         // console.log(response);
    //                     },
    //                     (errorResponse) => {
    //                         console.error(errorResponse);
    //                     }
    //                 );
    //         });
    //     }
    //     this.groupCandidatesByStage();
    // }

    // onCandidateDeleteDrop(event) {
    //     const deleteItem = event.dragData;
    //     this.selection = {
    //         columnId: deleteItem.stage[this.job.id],
    //         candidates: {
    //             [deleteItem.id]: true
    //         }
    //     };
    //     this.onShowModal();
    // }

    // isDraggedFromStage(stageId) {
    //     return stageId === this.draggedFromStage;
    // }

    // onCandidateDragStart(candidate, stageId) {
    //     this.candidateIsDragged = true;
    //     this.draggedFromStage = stageId;
    // }

    // onCandidateDragEnd(candidate, stageId) {
    //     this.candidateIsDragged = false;
    //     this.draggedFromStage = null;
    // }

    // onStageDragStart(stage) {
    //     this.draggedStage = stage;
    // }

    // onStageDragEnd() {
    //     this.draggedStage = null;
    // }

    // onStageDragOver(event, order) {
    //     if (order !== this.draggedStage.order) {
    //         const draggedOverStageIndex = this.stages.findIndex((s) => s.order === order);
    //         const draggedStageIndex = this.stages.findIndex((s) => s.order === this.draggedStage.order);
    //         this.stages.splice(draggedStageIndex, 1);
    //         this.stages.splice(draggedOverStageIndex, 0, this.draggedStage);
    //         this.stages.forEach((s, index) => {
    //             s.order = index + 1;
    //         });

    //         this.jobService
    //             .updateStages(this.job.id, this.stages)
    //             .subscribe(
    //                 () => console.log('Stages order was updated'),
    //                 (errorResponse) => console.error(errorResponse)
    //             );
    //     }
    // }

    updateAuditForCandidate(candidate, stageFromId, stageToId) {
        if (candidate.audit && candidate.audit[this.job.id]) {
            candidate.audit[this.job.id].push({
                candidate_name: candidate.first_name,
                created_at: new Date().getTime(),
                job_title: this.job.title,
                user_id: this.user.id,
                stage_from_id: stageFromId,
                stage_to_id: stageToId,
                type: 'stages_progress'
            });
        } else {
            candidate.audit[this.job.id] = [];
            candidate.audit[this.job.id] = [
                {
                    candidate_name: candidate.first_name,
                    created_at: new Date().getTime(),
                    job_title: this.job.title,
                    user_id: this.user.id,
                    stage_from_id: stageFromId,
                    stage_to_id: stageToId,
                    type: 'stages_progress'
                }
            ];
        }
    }

    updateAssessmentsForCandidate(candidate, stageId) {
        if (candidate.assignments) {
            if (!candidate.assignments[this.job.id]) {
                candidate.assignments[this.job.id] = [];
            }
            let stage = this.stages.find((s) => s.id === stageId);
            if (stage && stage.assessment) {
                stage.assessment.forEach((as) => {
                    candidate.assignments[this.job.id].push({ id: stageId, type: as.type });
                });
            }
        }
    }
}
