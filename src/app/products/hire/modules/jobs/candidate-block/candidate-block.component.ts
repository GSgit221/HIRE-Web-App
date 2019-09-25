import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate, Job } from '../../../../../core/models';
import { JobService } from '../../../../../core/services';

@Component({
    selector: 'app-candidate-block',
    templateUrl: './candidate-block.component.html',
    styleUrls: ['./candidate-block.component.scss']
})
export class CandidateBlockComponent implements OnInit {
    @Input() candidate: Candidate;
    @Input() job: Job;
    @Input() resumeThreshold: number;
    @Input() selected: boolean;
    @Output() onSelect = new EventEmitter<string>();
    _candidateQuestions: any;
    @Input('candidateQuestions')
    set candidateQuestions(value: boolean) {
        this._candidateQuestions = value;
    }
    constructor(private jobService: JobService) {}

    ngOnInit() {}

    titleCase(str: string) {
        return str
            .replace(/#/g, '')
            .split(/[-|_]/g)
            .join(' ')
            .replace(/\w*\S/g, (t) => t[0].toUpperCase() + t.substr(1));
    }

    onSelectCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.onSelect.next(candidateId);
    }

    get hasRead() {
        const jobId = this.job.id;
        const { read = [] } = this.candidate;
        return read.length ? read.findIndex((jId) => jId === jobId) !== -1 : false;
    }

    getComplianceRateClass() {
        if ((this.candidate.hasUser && this.candidate.hasUserReviewed) || this.candidate.matching) {
            if (this.candidate.score >= this.resumeThreshold) {
                return 'green';
            } else if (
                this.candidate.score >= this.resumeThreshold - 15 &&
                this.candidate.score < this.resumeThreshold
            ) {
                return 'orange';
            } else {
                return 'red';
            }
        } else {
            return 'yellow';
        }
    }

    getQuestionsClass() {
        if ((this.candidate.hasUser && this.candidate.hasUserReviewed) || this.candidate.matching) {
            if (this._candidateQuestions && this._candidateQuestions.hasAnswers) {
                return this._candidateQuestions.knockoutIncorrect ? 'red' : 'green';
            } else {
                return 'grey';
            }
        } else {
            return 'grey';
        }
    }

    getCurrentStageClass(candidate) {
        //define stage
        if (candidate.stage && candidate.stage[this.job.id] && candidate.stage[this.job.id] !== 'applied') {
            const stageId = candidate.stage[this.job.id];
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
                            candidate.stages_data &&
                            candidate.stages_data[this.job.id] &&
                            candidate.stages_data[this.job.id][stageId]
                                ? candidate.stages_data[this.job.id][stageId]
                                : {};
                        stage.assessment.forEach((ass) => {
                            if (ass.type === 'personality') {
                                if (stageData.personality_assessment) {
                                    completed.push(true);
                                } else {
                                    completed.push(false);
                                }
                            }
                            if (ass.type === 'video-interview') {
                                if (stageData.videos && stageData.videos.completed) {
                                    completed.push(true);
                                } else {
                                    completed.push(false);
                                }
                            }

                            if (ass.type === 'logic-test') {
                                if (stageData['logic-test']) {
                                    completed.push(true);
                                } else {
                                    completed.push(false);
                                }
                            }

                            if (ass.type === 'devskiller') {
                                const devAss =
                                    candidate.assignments && candidate.assignments[this.job.id]
                                        ? candidate.assignments[this.job.id].find(
                                              (a) => a.stageId === stageId && ass.type === 'devskiller'
                                          )
                                        : {};
                                if (devAss.completed) {
                                    completed.push(true);
                                } else {
                                    completed.push(false);
                                }
                            }
                        });
                        // console.log(candidate.id, candidate.first_name, completed);
                        return completed.every((c) => c) ? 'green' : 'grey';
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
            const complienceRate = this.getComplianceRateClass();
            const questionsStatus = this.job.questionnaire ? this.getQuestionsClass() : null;
            const values = [];
            values.push(this._getClassValue(complienceRate));
            if (questionsStatus) {
                values.push(this._getClassValue(questionsStatus));
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
}
