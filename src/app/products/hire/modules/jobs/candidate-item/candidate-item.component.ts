import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { CandidateService } from './../../../../../core/services/candidate.service';

import { UIChart } from 'primeng/chart';
import { forkJoin, of, Subscription } from 'rxjs';
import { Candidate, EmailTemplate, Job, Stage, User } from '../../../../../core/models';
import * as fromJobsStore from '../store';
import * as fromJobCandiatesSelector from '../store/selectors/jobCandidates.selector';
import { EmailService, JobService, QuestionnaireService, UtilitiesService } from './../../../../../core/services';
import * as fromStore from './../../../../../store';
import * as fromSeflectors from './../../../../../store/selectors';

interface ISelect {
    label?: string;
    value: number | string;
}

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit, OnDestroy {
    sections: string[] = ['overview', 'details', 'assessments', 'attachments'];
    activeSection = 'overview';
    activeInteractivity = 'chat';
    jobId: string;
    job: Job;
    stages: Stage[] = [];
    user: User;
    candidateId: string;
    candidate: Candidate;
    matchingMap = {
        JOB_TITLES: 'Job Titles',
        SKILLS: 'Skills',
        INDUSTRIES: 'Industries',
        CERTIFICATIONS: 'Certifications',
        MANAGEMENT_LEVEL: 'Management Level'
    };
    personalityProfileScores = [
        { title: 'Extroversion', value: 0, average: 60, scoreText: '' },
        { title: 'Agreeableness', value: 0, average: 60, scoreText: '' },
        { title: 'Openness', value: 0, average: 60, scoreText: '' },
        { title: 'Conscientiousness', value: 0, average: 60, scoreText: '' },
        { title: 'Neuroticism', value: 0, average: 60, scoreText: '' }
    ];
    radar_chart_data: any;
    radar_chart_options: any;
    showVideoScore = false;
    stars: any[] = [{ index: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    contentLoading = true;
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[];
    showFeedback = false;
    jobOwner = false;
    questions: any[];
    questionsAnswers: any = {};

    personality_assessment: any = null;

    stageId: string = '';
    videos: any[] = [];
    videoInterviewQuestions: any[] = [];
    @ViewChild('chart') chart: UIChart;
    baseUrl: string;

    emailTemplates: ISelect[];
    declineModalVisible: boolean = false;
    declineModalForm: FormGroup;
    modalSubmission: object = {};
    emailModalVisible: boolean = false;

    candidateSubscription: Subscription;
    userSubscription: Subscription;

    constructor(
        private jobService: JobService,
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private emailService: EmailService,
        private route: ActivatedRoute,
        private router: Router,
        private utilities: UtilitiesService,
        private questionnaireService: QuestionnaireService,
        private store: Store<fromStore.State>,
        private jobsStore: Store<fromJobsStore.JobsState>
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];

        this.radar_chart_data = {
            labels: ['Extroversion', 'Agreeableness', 'Conscientiousness', 'Neuroticism', 'Openness'],
            datasets: [
                {
                    label: 'Second Dataset',
                    data: [0, 0, 0, 0, 0],
                    fill: true,
                    backgroundColor: 'rgba(76, 217, 100, 0.3)',
                    borderColor: '#4cd964',
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: 'Avarage Dataset',
                    data: [72, 72, 72, 72, 72],
                    fill: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderColor: '#e5e5ea',
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }
            ]
        };

        this.radar_chart_options = {
            scale: {
                pointLabels: { fontSize: 15, fontColor: '#000000' },
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 120,
                    stepSize: 40,
                    fontColor: '#525f7f',
                    fontStyle: 'bold',
                    padding: 100,
                    backdropColor: 'transparent',
                    userCallback: (label, index, labels) => {
                        if (index === 1) {
                            return 'LOW';
                        } else if (index === 2) {
                            return 'NEUTRAL';
                        } else if (index === 3) {
                            return 'HIGH';
                        } else {
                            return '';
                        }
                    }
                }
            },
            legend: { display: false, labels: { fontColor: 'rgb(255, 99, 132)' } }
        };

        this.jobId = this.route.snapshot.paramMap.get('jobId');
        this.candidateId = this.route.snapshot.paramMap.get('candidateId');

        // Load Candidate from store
        this.candidateSubscription = this.jobsStore
            .pipe(
                select(fromJobCandiatesSelector.getJobCandidate, { jobId: this.jobId, candidateId: this.candidateId })
            )
            .subscribe((candidate: Candidate) => {
                if (!candidate) {
                    console.log('REDIRECT');
                    return this.router.navigateByUrl('/not-found');
                }
                this.candidate = candidate;
                // Get job
                const jobRequest = this.jobService.getJob(this.jobId).pipe(
                    switchMap((job: Job) => {
                        this.job = job;
                        this.stageId = this.candidate.stage[this.jobId];
                        if (!this.job.tags) this.job.tags = [];
                        this.stages = this.job.stages
                            .filter((stage) => stage.id !== 'applied')
                            .sort((a, b) => a.order - b.order);
                        if (this.job.questionnaire) {
                            this.sections.splice(2, 0, 'questions');
                            return this.questionnaireService.getQuestions(this.job.questionnaire);
                        } else {
                            return of(false);
                        }
                    })
                );
                const getVideoQuestions = this.questionnaireService.getVideoQuestions();
                const getAllData = forkJoin([jobRequest, getVideoQuestions]).subscribe((response: any) => {
                    setTimeout(() => (this.contentLoading = false), 200);
                    const questions = response[0];
                    const videoInterviewQuestions = response[1];
                    if (videoInterviewQuestions) {
                        this.videoInterviewQuestions = videoInterviewQuestions;
                    }
                    if (questions) {
                        this.questions = questions;
                        this.prepareQuestionsAnswers();
                    }

                    this.allowShowFeedback();

                    // After all data is loaded
                    // Attachments
                    if (
                        !this.candidate.resume_file &&
                        !this.candidate.resume_file_new &&
                        this.candidate.source !== 'application'
                    ) {
                        this.activeSection = 'attachments';
                    }
                    if (this.candidate.resume_file && this.candidate.resume_file.length) {
                        this.candidateService
                            .getResumeLink(this.candidate.resume_file)
                            .subscribe(
                                (response: string) => (this.candidate.resume_link = response),
                                (errorResponse) => console.error(errorResponse)
                            );
                    }
                    if (this.candidate.resume_file_new && this.candidate.resume_file_new.length) {
                        this.candidateService
                            .getResumeLink(this.candidate.resume_file_new)
                            .subscribe(
                                (response: string) => (this.candidate.resume_link_new = response),
                                (errorResponse) => console.error(errorResponse)
                            );
                    }

                    // Get assessments
                    if (this.candidate.stages_data && this.candidate.stages_data[this.jobId]) {
                        const stagesData = this.candidate.stages_data[this.jobId];
                        for (const stageId in stagesData) {
                            if (stagesData.hasOwnProperty(stageId)) {
                                const stageData = stagesData[stageId];
                                // Video
                                if (stageData.videos && stageData.videos.links) {
                                    const videos = stageData.videos.links;
                                    this.videoInterviewQuestions.forEach((q) => {
                                        if (videos[q.id]) {
                                            const video = videos[q.id];
                                            video.id = q.id;
                                            video.question = q.text;
                                            if (video.rating) {
                                                video.ratings = [];
                                                for (let i = 0; i < 5; i++) {
                                                    i < video.rating
                                                        ? video.ratings.push(video.rating)
                                                        : video.ratings.push(0);
                                                }
                                            }
                                            this.videos.push(video);
                                        }
                                    });
                                }

                                // Personal Profile
                                if (stageData.personality_assessment) {
                                    const assessment = stageData.personality_assessment;
                                    this.personality_assessment = stageData.personality_assessment;
                                    this.personalityProfileScores[0].value = assessment[1].score;
                                    this.personalityProfileScores[1].value = assessment[3].score;
                                    this.personalityProfileScores[2].value = assessment[2].score;
                                    this.personalityProfileScores[3].value = assessment[4].score;
                                    this.personalityProfileScores[4].value = assessment[0].score;
                                    this.personalityProfileScores[0].scoreText = assessment[1].scoreText;
                                    this.personalityProfileScores[1].scoreText = assessment[3].scoreText;
                                    this.personalityProfileScores[2].scoreText = assessment[2].scoreText;
                                    this.personalityProfileScores[3].scoreText = assessment[4].scoreText;
                                    this.personalityProfileScores[4].scoreText = assessment[0].scoreText;

                                    this.radar_chart_data.datasets[0].data = [
                                        assessment[1].score,
                                        assessment[3].score,
                                        assessment[4].score,
                                        assessment[0].score,
                                        assessment[2].score
                                    ];
                                    if (this.chart) {
                                        this.chart.refresh();
                                    }
                                }
                            }
                        }
                    } else {
                        console.log('No stages data for this job');
                    }
                });
            });
    }

    ngOnInit() {
        this.userSubscription = this.store.pipe(select(fromStore.getUserEntity)).subscribe((user: User) => {
            this.user = user;
        });
        this.emailService.findAll().subscribe((emailTemplates: EmailTemplate[]) => {
            if (emailTemplates && emailTemplates.length) {
                this.emailTemplates = emailTemplates
                    .filter(({ type }) => type && type.indexOf('decline_template_') !== -1)
                    .map(({ id, title }) => ({ value: id, label: title }));
            }
        });
        this.declineModalForm = this.fb.group({
            emailTemplate: [null, Validators.required]
        });
    }

    get candidateNameOrEmail() {
        if (!this.candidate) return '';
        const { first_name, last_name, email } = this.candidate;
        return { first_name, last_name, email };
    }

    isKnockout(section): boolean {
        return section === 'questions' && this.questionsAnswers && this.questionsAnswers.isKnockout;
    }

    allowShowFeedback() {
        if (this.job && this.candidate && this.user) {
            console.log('::: Check show feedback', this.job.owner, this.user.id);
            if (this.job.owner === this.user.id) {
                this.showFeedback = true;
            } else if (this.job && typeof this.job.show_position_rating !== 'undefined') {
                this.showFeedback = true;
            } else {
                this.showFeedback = false;
            }
        }
    }

    prepareQuestionsAnswers() {
        if (this.job && this.candidate && this.questions) {
            const questionsAnswers = [];
            let isKnockout = false;
            const candidateQuestions =
                this.candidate.job_specific &&
                this.candidate.job_specific.questions &&
                this.candidate.job_specific.questions[this.jobId]
                    ? this.candidate.job_specific.questions[this.jobId]
                    : null;
            this.questions.forEach((q) => {
                const obj = {
                    text: q.text,
                    answers: [],
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
                                    obj.answers.push(answer.text);
                                }
                            });
                        } else {
                            const qa = candidateQuestions[q.id];
                            const answer = q.answers.find((a) => a.id === qa);
                            if (qa.selectedItems) {
                                qa.selectedItems.forEach((c) => {
                                    let answer = q.answers.find((b) => b.id === c);
                                    if (answer) {
                                        obj.answers.push(answer.text);
                                    }
                                });
                            }
                            if (answer) {
                                applyKnockout.call(obj, answer);
                                obj.answers.push(answer.text);
                            }
                        }
                    } else {
                        obj.answers.push(candidateQuestions[q.id]);
                    }
                }

                questionsAnswers.push(obj);
            });
            this.questionsAnswers = {
                questions: questionsAnswers.slice(0),
                isKnockout
            };
        }
    }

    onChangeSection(section: string) {
        this.activeSection = section;
        if (!this.candidate.resume_file && !this.candidate.resume_file_new) {
            this.activeSection = 'attachments';
        }

        if (this.chart) {
            this.chart.refresh();
        }
    }

    onChangeInteractivity(section: string) {
        this.activeInteractivity = section;
    }

    onBackClick() {
        this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.jobId}`);
    }

    processFiles(files) {
        for (let i = 0, file; (file = files[i]); i++) {
            // console.log(file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                // ADD TO THE QUEUE
                // console.log('We need to upload that file 🎈');
                this.uploadQueue.push({
                    file,
                    uploadStarted: false,
                    uploadFinished: false,
                    progress: 0,
                    success: false,
                    text: file.name
                });
            } else {
                this.uploadError = 'Only supported formats are: pdf, doc, docx, rtf, odt';
                setTimeout(() => (this.uploadError = null), 10000);
            }
        }
        this.processQueue();
    }

    onDropFromFiles(event: any) {
        const file = event.dragData;
        this.uploadQueue.push({
            file,
            uploadStarted: false,
            uploadFinished: false,
            progress: 0,
            success: false,
            text: file.file_name
        });
        this.processQueue();
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        // console.log('📥 onDropFile', files);
        this.processFiles(files);
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    processQueue() {
        this.uploadQueue.forEach((item) => {
            if (!item.uploadStarted && !item.uploadFinished) {
                this.uploadFile(item);
            }
        });
    }

    uploadFile(item) {
        this.utilities
            .readFile(item.file)
            .then((fileValue) => {
                item.uploadStarted = true;
                const uploadProgressInterval = setInterval(() => {
                    item.progress = item.progress + 1 < 100 ? item.progress + 1 : item.progress;
                }, 400);
                this.jobService.updateCandidateWithCv(this.jobId, this.candidateId, { resume: fileValue }).subscribe(
                    (response: HttpResponse<any>) => {
                        console.log('📬 Uploaded:', response);
                        const resp: any = response;
                        item.progress = 100;
                        item.uploadFinished = true;
                        item.success = true;
                        clearInterval(uploadProgressInterval);

                        setTimeout(() => {
                            item.fadeout = true;
                        }, 2000);

                        // Remove from upload queue
                        setTimeout(() => {
                            const itemIndex = this.uploadQueue.findIndex((ui) => ui.id === item.id);
                            if (itemIndex !== -1) {
                                this.uploadQueue.splice(itemIndex, 1);
                            }
                        }, 3000);
                        this.candidate = { ...this.candidate, ...resp.candidate };
                        this.onChangeSection('details');
                        // this.jobService.getCandidate(this.jobId, this.candidateId)
                        //     .subscribe((candidate: JobCandidate) => {
                        //         this.candidate = candidate;
                        //     });
                        // this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.jobId}`);
                    },
                    (error) => {
                        console.error(error);
                        item.text = error && error.error && error.error.message ? error.error.error.message : 'Error';
                        item.progress = 100;
                        item.uploadFinished = true;
                        clearInterval(uploadProgressInterval);
                    }
                );
            })
            .catch((error) => {
                console.error(error);
                console.error('Error reading uploaded file');
            });
    }

    onViewAndRate(index) {
        this.showVideoScore = true;
        this.videos[index].current = true;

        this.stars.forEach((s) => (s.active = false));
        if (this.videos[index].rating) {
            for (let i = 0; i <= this.videos[index].rating - 1; i++) {
                this.stars[i].active = true;
            }
        }
    }
    onCloseModal() {
        this.videos.forEach((s) => (s.current = false));
        this.stars.forEach((s) => (s.active = false));
        this.showVideoScore = false;
    }

    onEvaluateAnswer(index, questionId) {
        this.stars.forEach((s) => (s.active = false));
        for (let i = 0; i <= index; i++) {
            this.stars[i].active = true;
        }
        const video = this.videos.find((v) => v.id === questionId);
        if (video) {
            video.rating = index + 1;
        }
        this.jobService
            .evaluateCandidateVideoAnswer(this.jobId, this.candidateId, this.stageId, {
                id: questionId,
                rating: index + 1
            })
            .subscribe((response: any) => {
                // DONE
                // console.log(this.videos, questionId, index);
                let video = this.videos.find((c) => {
                    if (c.id === questionId) {
                        return c;
                    }
                });
                video.rating = index + 1;
                video.ratings = [];
                for (let i = 0; i < 5; i++) {
                    i < video.rating ? video.ratings.push(video.rating) : video.ratings.push(0);
                }
            });
    }
    onNextQuestion(index) {
        if (this.videos.length - 1 === index) {
            this.onCloseModal();
            return false;
        }

        this.videos[index].current = false;
        this.videos[index + 1].current = true;
        this.stars.forEach((s) => (s.active = false));
        if (this.videos[index + 1].rating) {
            for (let i = 0; i <= this.videos[index + 1].rating - 1; i++) {
                this.stars[i].active = true;
            }
        }
    }
    onHoverStars(index) {
        this.stars.forEach((s) => (s.hover = false));
        for (let i = 0; i <= index; i++) {
            this.stars[i].hover = true;
        }
    }
    onClearStars() {
        this.stars.forEach((s) => (s.hover = false));
    }

    isValidField(form, key) {
        return !this[form].get(key).valid && this.modalSubmission[form];
    }

    onDecline() {
        if (this.declineModalForm.valid) {
            const { emailTemplate: emailTemplateId } = this.declineModalForm.value;
            const {
                job: { id: jobId },
                candidate: { id: candidateId }
            } = this;

            this.contentLoading = true;
            this.jobService.deleteCandidate(jobId, candidateId, emailTemplateId).subscribe(
                () => {
                    console.log(`Candidate <${candidateId}> was declined`);
                    this.onBackClick();
                },
                (error) => {
                    this.contentLoading = false;
                    console.error(error);
                }
            );
        } else {
            this.modalSubmission['declineModalForm'] = true;
        }
    }

    onShowModal(visible = true) {
        if (visible) {
            this.declineModalForm.reset();
            delete this.modalSubmission['declineModalForm'];
        }
        this.declineModalVisible = visible;
    }

    get isProgressable() {
        if (this.job && this.candidate) {
            const {
                job: { id: jobId },
                stages,
                candidate: { stage }
            } = this;

            if (stage) {
                const stageId = stage[jobId];
                const columnIndex = stages.findIndex(({ id }) => id === stageId);
                return columnIndex + 1 < stages.length;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    onProgress() {
        const {
            job: { id: jobId },
            stages,
            user: { id: userId },
            candidate: { id: candidateId, stage }
        } = this;
        const stageId = stage[jobId];

        const columnIndex = stages.findIndex(({ id }) => id === stageId);
        const { id: fromId = 'applied' } = columnIndex === -1 ? { id: 'applied' } : this.stages[columnIndex];
        const { id: toId, title } = stages[columnIndex + 1];

        this.contentLoading = true;
        stage[jobId] = toId;

        this.jobService.updateCandidateStage(jobId, candidateId, { stage }).subscribe(() => {
            console.log(`Candidate <${candidateId}> was progressed to - ${title}`);
            this.contentLoading = false;
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
                        console.log(response);
                    },
                    (errorResponse) => {
                        console.error(errorResponse);
                    }
                );
        });
    }

    onShowEmailModal(visible = true) {
        this.emailModalVisible = visible;
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.candidateSubscription) {
            this.candidateSubscription.unsubscribe();
        }
    }
}
