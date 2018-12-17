import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Job } from '../../../models/job';
import { User } from '../../../models/user';
import { JobCandidate } from './../../../models/job-candidate';
import { JobService } from './../../../services/job.service';
import { QuestionnaireService } from './../../../services/questionnaire.service';
import { UtilitiesService } from './../../../services/utilities.service';
import * as fromStore from './../../../store';

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
    candidate: JobCandidate;
    matchingMap = {
        JOB_TITLES: 'Job Titles',
        SKILLS: 'Skills',
        INDUSTRIES: 'Industries',
        CERTIFICATIONS: 'Certifications',
        MANAGEMENT_LEVEL: 'Management Level'
    };
    contentLoading = true;
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[];
    showFeedback = false;
    jobOwner = false;
    questions: any[];
    questionsAnswers: any[] = [];

    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private router: Router,
        private utilities: UtilitiesService,
        private questionnaireService: QuestionnaireService,
        private store: Store<fromStore.State>
    ) {
        this.jobId = this.route.snapshot.paramMap.get('jobId');
        this.candidateId = this.route.snapshot.paramMap.get('candidateId');
        this.jobService.getJob(this.jobId).subscribe((job: Job) => {
            this.allowShowFeedback();
            this.job = job;
            if (this.job.questionnaire) {
                this.sections.splice(2, 0, 'questions');
                this.questionnaireService.getQuestions(this.job.questionnaire).subscribe(
                    (response: any) => {
                        this.questions = response;
                        this.prepareQuestionsAnswers();
                    },
                    (errorResponse) => console.error(errorResponse)
                );
            }
        });
        this.jobService.getCandidate(this.jobId, this.candidateId).subscribe((candidate: JobCandidate) => {
            this.candidate = candidate;
            setTimeout(() => (this.contentLoading = false), 200);
            // console.log(' ⚡️ FROM ROUTE  --- JOB:', this.jobId, this.candidateId);
            if (!this.candidate.resume_file && this.candidate.source !== 'application') {
                this.activeSection = 'attachments';
            }
            this.allowShowFeedback();
            this.prepareQuestionsAnswers();
        });

        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    ngOnInit() {}
    allowShowFeedback() {
        if (this.job && this.candidate) {
            this.store.select(fromStore.getUserEntity).subscribe((user: User) => {
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
            const candidateQuestions =
                this.candidate.questions && this.candidate.questions[this.jobId]
                    ? this.candidate.questions[this.jobId]
                    : null;
            this.questions.forEach((q) => {
                const obj = {
                    text: q.text,
                    answers: []
                };
                if (candidateQuestions && candidateQuestions[q.id]) {
                    if (Array.isArray(candidateQuestions[q.id])) {
                        candidateQuestions[q.id].forEach((qa) => {
                            const answer = q.answers.find((a) => a.id === qa);
                            if (answer) {
                                obj.answers.push(answer.text);
                            }
                        });
                    } else {
                        const qa = candidateQuestions[q.id];
                        const answer = q.answers.find((a) => a.id === qa);
                        if (answer) {
                            obj.answers.push(answer.text);
                        }
                    }
                }

                questionsAnswers.push(obj);
            });
            this.questionsAnswers = questionsAnswers.slice(0);
        }
    }

    // processMatching() {
    //     if (this.candidate && this.candidate.matching && this.candidate.matching[this.jobId] && this.candidate.matching[this.jobId].UnweightedCategoryScores && this.candidate.skills) {
    //         const matching = this.candidate.matching[this.jobId];
    //         const scores = matching.UnweightedCategoryScores;
    //         scores.forEach(s => {
    //             s.TermsFound.forEach(t => {
    //                 const skill = this.candidate.skills.find(sk => sk.title === t);
    //                 if (skill) {
    //                     skill.found_in_matching = true;
    //                 }
    //             });
    //         });
    //     }
    // }

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
        this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
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
                        // this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
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
}
