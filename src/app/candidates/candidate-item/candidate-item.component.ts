import { HttpResponse } from '@angular/common/http';
import { UtilitiesService } from './../../services/utilities.service';
import { JobCandidate } from './../../models/job-candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { User } from '../../models/user';

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
    activeSection = 'overview';
    activeInteractivity = 'chat';
    summaryContentShow = true;
    experienceContentShow = true;
    educationContentShow = true;
    jobId: string;
    job: Job;
    candidateId: string;
    matchingMap = {
        JOB_TITLES: 'Job Titles',
        SKILLS: 'Skills',
        INDUSTRIES: 'Industries',
        CERTIFICATIONS: 'Certifications',
        MANAGEMENT_LEVEL: 'Management Level',
    };

    candidate: JobCandidate;
    contentLoading = true;
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[];
    showFeedback = false;
    jobOwner = false;

    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private router: Router,
        private utilities: UtilitiesService,
        private store: Store<State>,
    ) {
        this.jobId = this.route.snapshot.paramMap.get('jobId');
        this.candidateId = this.route.snapshot.paramMap.get('candidateId');
        this.jobService.getJob(this.jobId).subscribe((job: Job) => {
            this.allowShowFeedback();
            return this.job = job;
        });
        this.jobService.getCandidate(this.jobId, this.candidateId)
            .subscribe((candidate: JobCandidate) => {
                this.candidate = candidate;
                console.log(this.candidate);
                setTimeout(() => this.contentLoading = false, 200);
                console.log('FROM ROUTE-------------------- JOB:', this.jobId, this.candidateId);
                if (!this.candidate.resume_file) {
                    this.activeSection = 'attachments';
                }
                this.allowShowFeedback();
            });

        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    ngOnInit() {
    }
    allowShowFeedback() {
        if (this.job && this.candidate) {
            this.store.select('user').subscribe((user: User) => {
                console.log('Got user:', user);
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
        for (let i = 0, file; file = files[i]; i++) {
            console.log(file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                // ADD TO THE QUEUE
                console.log('We need to upload that file 🎈');
                this.uploadQueue.push({
                    file: file,
                    uploadStarted: false,
                    uploadFinished: false,
                    progress: 0,
                    success: false,
                    text: file.name
                });
            } else {
                this.uploadError = 'Only supported formats are: pdf, doc, docx, rtf, odt';
                setTimeout(() => this.uploadError = null, 10000);
            }
        }
        this.processQueue();
    }

    onDropFromFiles(event: any) {
        const file = event.dragData;
        console.log(file);
        // this.uploadQueue.push({
        //     file: file,
        //     uploadStarted: false,
        //     uploadFinished: false,
        //     progress: 0,
        //     success: false,
        //     text: file.file_name
        // });
        // this.processQueue();
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFile', files);
        this.processFiles(files);
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    processQueue() {
        this.uploadQueue.forEach(item => {
            if (!item.uploadStarted && !item.uploadFinished) {
                this.uploadFile(item);
            }
        });
    }

    uploadFile(item) {
        this.utilities.readFile(item.file)
            .then(fileValue => {
                item.uploadStarted = true;
                const uploadProgressInterval = setInterval(() => {
                    item.progress = (item.progress + 1 < 100) ? item.progress + 1 : item.progress;
                }, 400);
                this.jobService.updateCandidateWithCv(this.jobId, this.candidateId, { resume: fileValue })
                    .subscribe((response: HttpResponse<any>) => {
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
                            const itemIndex = this.uploadQueue.findIndex(ui => ui.id === item.id);
                            if (itemIndex !== -1) {
                                this.uploadQueue.splice(itemIndex, 1);
                            }
                        }, 3000);
                        this.candidate = Object.assign(this.candidate, resp.candidate);
                        this.onChangeSection('details');
                        // this.jobService.getCandidate(this.jobId, this.candidateId)
                        //     .subscribe((candidate: JobCandidate) => {
                        //         this.candidate = candidate;
                        //     });
                        // this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
                    }, error => {
                        console.error(error);
                        item.text = error && error.error && error.error.message ? error.error.error.message : 'Error';
                        item.progress = 100;
                        item.uploadFinished = true;
                        clearInterval(uploadProgressInterval);
                    });
            })
            .catch(error => {
                console.error(error);
                console.error('Error reading uploaded file');
            });
    }

}
