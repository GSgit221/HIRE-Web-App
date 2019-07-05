import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { CandidateService } from './../../../../../core/services/candidate.service';

import { UIChart } from 'primeng/chart';
import { forkJoin, of } from 'rxjs';
import { Candidate } from '../../../../../core/models/candidate';
import { Job } from '../../../../../core/models/job';
import { User } from '../../../../../core/models/user';
import { JobService } from './../../../../../core/services/job.service';
import { QuestionnaireService } from './../../../../../core/services/questionnaire.service';
import { UtilitiesService } from './../../../../../core/services/utilities.service';
import * as fromStore from './../../../../../store';
import * as fromSelectors from './../../../../../store/selectors';

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
    sections: string[] = ['overview', 'details', 'attachments'];
    activeSection = 'overview';
    activeInteractivity = 'chat';
    jobId: string;
    job: Job;
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

    stageId: string = '';
    videos: any[] = [];
    videoInterviewQuestions: any[] = [];
    @ViewChild('chart') chart: UIChart;
    baseUrl: string;

    constructor(
        private jobService: JobService,
        private candidateService: CandidateService,
        private route: ActivatedRoute,
        private router: Router,
        private utilities: UtilitiesService,
        private questionnaireService: QuestionnaireService,
        private store: Store<fromStore.State>,
        private cd: ChangeDetectorRef
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

        // Get job
        const jobRequest = this.jobService.getJob(this.jobId).pipe(
            switchMap((job: Job) => {
                this.allowShowFeedback();
                this.job = job;
                if (this.job.questionnaire) {
                    this.sections.splice(2, 0, 'questions');
                    return this.questionnaireService.getQuestions(this.job.questionnaire);
                } else {
                    return of(false);
                }
            })
        );
        const candidateRequest = this.jobService.getCandidate(this.jobId, this.candidateId);
        const getAllData = forkJoin([jobRequest, candidateRequest]).pipe(
            switchMap((response: any) => {
                const questions = response[0];
                const candidate: any = response[1];
                this.candidate = candidate;

                if (questions) {
                    this.questions = questions;
                    this.prepareQuestionsAnswers();
                }

                this.stageId = this.candidate.stage[this.jobId];
                const stageSettings = this.job.stages.find((s) => s.id === this.stageId);
                if (
                    stageSettings &&
                    stageSettings.assessment &&
                    stageSettings.assessment.find((ass) => ass.type === 'video-interview')
                ) {
                    const assessment = stageSettings.assessment.find((ass) => ass.type === 'video-interview');
                    const questionnaireId = assessment.option;
                    if (questionnaireId) {
                        return this.questionnaireService.getQuestions(questionnaireId);
                    } else {
                        return of(false);
                    }
                } else {
                    return of(false);
                }
            })
        );
        getAllData.subscribe((videoInterviewQuestions: any) => {
            setTimeout(() => (this.contentLoading = false), 200);
            if (videoInterviewQuestions) {
                this.videoInterviewQuestions = videoInterviewQuestions;
            }

            // After all data is loaded
            // Attachments
            if (!this.candidate.resume_file && this.candidate.source !== 'application') {
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
            // Video
            if (
                this.candidate.stages_data &&
                this.candidate.stages_data[this.jobId] &&
                this.candidate.stages_data[this.jobId][this.stageId] &&
                this.candidate.stages_data[this.jobId][this.stageId].videos &&
                this.candidate.stages_data[this.jobId][this.stageId].videos.links
            ) {
                const videos = this.candidate.stages_data[this.jobId][this.stageId].videos.links;
                this.videoInterviewQuestions.forEach((q) => {
                    if (videos[q.id]) {
                        const video = videos[q.id];
                        video.id = q.id;
                        video.question = q.text;
                        if (video.rating) {
                            video.ratings = [];
                            for (let i = 0; i < 5; i++) {
                                i < video.rating ? video.ratings.push(video.rating) : video.ratings.push(0);
                            }
                        }
                        this.videos.push(video);
                    }
                });
            }

            if (
                this.candidate.stages_data &&
                this.candidate.stages_data[this.jobId] &&
                this.candidate.stages_data[this.jobId][this.stageId] &&
                this.candidate.stages_data[this.jobId][this.stageId].personality_assessment
            ) {
                // Personal Profile

                const assessment = this.candidate.stages_data[this.jobId][this.stageId].personality_assessment;
                // console.log('personal assessment', assessment);
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
                this.chart.refresh();
                console.log(this.personalityProfileScores);
            }
        });
    }

    get personality_assessment() {
        if (
            this.candidate &&
            this.candidate.stages_data &&
            this.candidate.stages_data[this.jobId] &&
            this.candidate.stages_data[this.jobId][this.stageId] &&
            this.candidate.stages_data[this.jobId][this.stageId].personality_assessment
        ) {
            return this.candidate.stages_data[this.jobId][this.stageId].personality_assessment;
        }
    }

    ngOnInit() {}

    allowShowFeedback() {
        if (this.job && this.candidate) {
            this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
                // console.log('Got user:', user);
                if (this.job.owner === user.id) {
                    this.showFeedback = true;
                    if (this.showFeedback) {
                        return true;
                    }
                } else if (this.job && typeof this.job.show_position_rating !== 'undefined') {
                    this.showFeedback = true;
                } else {
                    this.showFeedback = false;
                }
            });
        }
    }

    prepareQuestionsAnswers() {
        if (this.job && this.candidate && this.questions) {
            const questionsAnswers = [];
            let isKnockout = false;
            const candidateQuestions =
                this.candidate.questions && this.candidate.questions[this.jobId]
                    ? this.candidate.questions[this.jobId]
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
        if (!this.candidate.resume_file) {
            this.activeSection = 'attachments';
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
                console.log(this.videos, questionId, index);
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
}
