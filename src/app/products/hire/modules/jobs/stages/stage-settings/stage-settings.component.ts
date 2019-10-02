import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from 'primeng/slider';
import { Questionnaire } from './../../../../../../core/models/questionnaire';
import { QuestionnaireService } from './../../../../../../core/services/questionnaire.service';

import { UtilitiesService } from '@app/core/services';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { Job } from '../../../../../../core/models/job';
import { Stage } from '../../../../../../core/models/stage';
import { FormHelperService } from './../../../../../../core/services/form-helper.service';
import { JobService } from './../../../../../../core/services/job.service';

import * as fromJobsStore from '../../store';
import * as fromJobCandiatesSelector from '../../store/selectors/jobCandidates.selector';

import { select, Store } from '@ngrx/store';

@Component({
    selector: 'app-stage-settings',
    templateUrl: './stage-settings.component.html',
    styleUrls: ['./stage-settings.component.scss']
})
export class StageSettingsComponent implements OnInit {
    @ViewChild('hcSlider') hcSlider: Slider;
    contentLoading = false;
    stage: Stage;
    jobId: string;
    job: Job;
    stageId: string;
    titleMaxLength: 30;
    stageSettingsForm: FormGroup;
    questionnaireList: Questionnaire[] = [];
    questionnaireOptions = [];
    allowanceOptions = [
        { label: '1 day', value: 1 },
        { label: '2 days', value: 2 },
        { label: '3 days', value: 3 },
        { label: '7 days', value: 7 },
        { label: '14 days', value: 14 },
        { label: '30 days', value: 30 }
    ];
    assessmentTypeOptions = [
        { label: 'Personality Assessment', value: 'personality' },
        { label: 'One Way Video Interview', value: 'video-interview' }
    ];
    devskillerOptions = [];
    assessmentList = [];
    assessmentListCompleted = false;

    assessmentBenchmarkOptions = [{ label: 'Systems Engineer (JF5593)', value: 'system_engeneer' }];
    assessmentDeadlineOptions = [
        { label: 'Default - 5 Days', value: 5 },
        { label: '6 Days', value: 6 },
        { label: '7 Days', value: 7 },
        { label: '8 Days', value: 8 },
        { label: '9 Days', value: 9 },
        { label: '10 Days', value: 10 }
    ];
    baseUrl: string;
    stageHasCandidate = false;
    errorModalVisible = false;

    matchingMap = {
        education: 'Education',
        job_titles: 'Job Titles',
        skills: 'Skills',
        industries: 'Industries',
        languages: 'Languages',
        certifications: 'Certifications',
        executive_type: 'Executive Type',
        management_level: 'Management Level'
    };
    stageWeighting: any = {};

    constructor(
        private jobService: JobService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private questionnaireService: QuestionnaireService,
        private utilities: UtilitiesService,
        private jobsStore: Store<fromJobsStore.JobsState>
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.jobId = this.route.snapshot.paramMap.get('id');
        this.stageId = this.route.snapshot.paramMap.get('stageId');
        this.contentLoading = true;

        this.jobsStore.dispatch(new fromJobsStore.LoadJobCandidates(this.jobId));
        this.jobsStore
            .pipe(select(fromJobCandiatesSelector.getJobCandidates, { jobId: this.jobId }))
            .subscribe((candidates: any) => {
                // this.stageHasCandidate = candidates.some(
                //     (c) => c.stage && c.stage[this.jobId] && c.stage[this.jobId] === this.stageId
                // );
                candidates.forEach((cand) => {
                    if (cand.assignments && cand.assignments[this.jobId]) {
                        cand.assignments[this.jobId].forEach((c) => {
                            if (c.stageId === this.stageId) {
                                this.stageHasCandidate = true;
                            }
                        });
                    }
                });
            });

        this.jobService.getDevskillerTest().subscribe((res: any) => {
            if (res) {
                res.forEach((c) => {
                    this.devskillerOptions.push({ label: c.name, value: c.id, selected: false });
                });
                this.devskillerOptions.sort((a, b) => {
                    const labelA = a.label.toUpperCase();
                    const labelB = b.label.toUpperCase();
                    return labelA.localeCompare(labelB);
                });
                if (this.assessment && this.stage.assessment) {
                    this.assessment['controls'].forEach((c) => {
                        if (c['controls'].type.value === 'devskiller') {
                            let assessment = this.stage.assessment.find((s) => c['controls'].option.value === s.option);
                            c['controls'].option.patchValue(assessment.option);
                        }
                    });
                }
            }
        });

        this.jobService.getJob(this.jobId).subscribe((job: Job) => {
            this.job = job;

            this.jobService.getStage(this.jobId, this.stageId).subscribe(
                (stage: Stage) => {
                    this.contentLoading = false;
                    this.stage = stage;

                    if (this.stage.id === 'applied') {
                        const weighting = {};
                        let stageTotalWeighting = 0;
                        if (this.job.sovren_categories) {
                            const { AppliedCategoryWeights, SuggestedCategoryWeights } = this.job.sovren_categories;
                            if (AppliedCategoryWeights) {
                                AppliedCategoryWeights.forEach(({ Category, Weight }) => {
                                    weighting[Category.toLowerCase()] = Weight * 100;
                                });
                            } else if (SuggestedCategoryWeights) {
                                SuggestedCategoryWeights.forEach(({ Category, Weight }) => {
                                    if (Weight > 0) weighting[Category.toLowerCase()] = Weight * 100;
                                });
                            }
                            if (this.stage.weighting) {
                                const stageWeighting = this.stage.weighting;
                                this.matchingKeys.forEach((key) => {
                                    stageTotalWeighting += stageWeighting[key] || 0;
                                    if (weighting[key]) {
                                        weighting[key] = [stageWeighting[key] || 0];
                                    }
                                });
                            }
                        } else if (this.stage.weighting) {
                            const stageWeighting = this.stage.weighting;
                            this.matchingKeys.forEach((key) => {
                                if (typeof stageWeighting[key] === 'number') {
                                    weighting[key] = [stageWeighting[key]];
                                }
                            });
                        }
                        this.stageWeighting = weighting;
                        const weightingKeys = Object.keys(weighting);

                        if (weightingKeys.length > 0) {
                            const firstKey = weightingKeys[0];
                            this.onHcSliderChangeWeighting(
                                { value: weighting[firstKey] + stageTotalWeighting / weightingKeys.length },
                                firstKey
                            );
                        }

                        this.stageSettingsForm = this.fb.group({
                            resume_matching_threshold: [this.stage.resume_matching_threshold],
                            automatically_progress_matching_threshold: [
                                this.stage.automatically_progress_matching_threshold
                            ],
                            weighting: this.fb.group(weighting)
                        });
                        console.log(this.stage, this.stageWeighting);

                        setTimeout(() => {
                            this.onHcSliderChange();
                        }, 100);
                    } else {
                        const actions = [];
                        if (this.stage.actions && this.stage.actions.length) {
                            this.stage.actions.forEach((a) => {
                                actions.push(this.createActionItem(a.type, a.options || null));
                            });
                        }
                        this.stageSettingsForm = this.fb.group({
                            title: [this.stage.title, Validators.required],
                            assessment: this.fb.array([]),
                            acceptance_criteria: [this.stage.acceptance_criteria],
                            automatically_progress_meeting_criteria: [
                                this.stage.automatically_progress_meeting_criteria || false
                            ],
                            actions: this.fb.array(actions)
                        });
                        if (this.stage.assessment) {
                            console.log(this.stage.assessment);
                            this.populateAssessment(this.stage.assessment);
                        } else {
                            // this.addAssessmentGroup();
                        }
                        this.questionnaireService.getAll().subscribe(
                            (response: Questionnaire[]) => {
                                this.contentLoading = false;
                                if (response) {
                                    const options = [];
                                    this.questionnaireList = response.filter((q) => q.type === 'video');
                                    this.questionnaireList.forEach((q) => {
                                        options.push({
                                            value: q.id,
                                            label: q.title,
                                            selected: false
                                        });
                                    });
                                    this.questionnaireOptions = options;
                                    setTimeout(() => {
                                        this.defineAssessmentStatus2();
                                    }, 200);
                                }
                            },
                            (error) => console.error(error)
                        );

                        setTimeout(() => {
                            this.onHcSliderChange();
                        }, 100);

                        let assessmentValue = this.stageSettingsForm.get('assessment').value;
                        this.stageSettingsForm
                            .get('assessment')
                            .valueChanges.pipe(distinctUntilChanged())
                            .subscribe((val) => {
                                if (val && val.length && !this.utilities.isEqual(val, assessmentValue)) {
                                    console.log('value changed', val);
                                    assessmentValue = val;
                                    const formArray = this.assessment;
                                    for (let fg of formArray.controls) {
                                        const val = fg.value;
                                        if (val.type.length || val.option.value) {
                                            fg.get('type').setValidators([Validators.required]);
                                            fg.get('option').setValidators([Validators.required]);
                                            fg.get('type').updateValueAndValidity();
                                            fg.get('option').updateValueAndValidity();
                                        } else {
                                            fg.get('type').clearValidators();
                                            fg.get('option').clearValidators();
                                            fg.get('type').updateValueAndValidity();
                                            fg.get('option').updateValueAndValidity();
                                        }
                                    }
                                }
                            });
                    }
                },
                (error) => {
                    this.contentLoading = false;
                    console.log(error);
                    this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.jobId}`);
                }
            );
        });
    }

    ngOnInit() {
        this.stageSettingsForm = this.fb.group({
            resume_matching_threshold: [60],
            automatically_progress_matching_threshold: [true],
            weighting: this.fb.group({})
        });
    }

    get matchingKeys() {
        return Object.keys(this.matchingMap);
    }

    get weightingKeys() {
        return Object.keys(this.stageWeighting);
    }

    onHcSliderChange() {
        const value =
            this.stage.id === 'applied'
                ? this.stageSettingsForm.get('resume_matching_threshold').value
                : this.stageSettingsForm.get('acceptance_criteria').value;
        if (this.hcSlider) {
            const handler = this.hcSlider.el.nativeElement.children[0].children[1];
            if (handler) {
                handler.innerHTML = value;
            }
        }
    }

    _shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    getWeighting(type) {
        const currentValue = this.stageSettingsForm.get('weighting').value;
        if (!currentValue) return 0;
        let ret = Math.round(currentValue[type]);
        let offset = 100 - this.totalWeighting;
        const keys = Object.keys(currentValue).sort((a, b) => {
            const offsetA = Math.round(currentValue[a]) - currentValue[a];
            const offsetB = Math.round(currentValue[b]) - currentValue[b];
            return offsetA - offsetB;
        });

        if (offset < 0) keys.reverse();
        let i = 0;
        const step = offset > 0 ? -1 : 1;
        while (offset !== 0) {
            if (keys[i] === type) {
                ret -= step;
                offset = 0;
            } else {
                offset += step;
                i++;
            }
        }

        return ret;
    }

    get totalWeighting() {
        const currentValue = this.stageSettingsForm.get('weighting').value;
        return Object.keys(currentValue).reduce((a, c) => (a += Math.round(currentValue[c])), 0);
    }

    onHcSliderChangeWeighting(e, input) {
        const val = e.value;
        const currentValue = this.stageSettingsForm.get('weighting').value;
        const keys = Object.keys(currentValue).filter((k) => k !== input);
        let points = keys.reduce((a, c) => (a += currentValue[c]), 0) + val;

        if (points === 100) return;
        points -= val;

        if (points > 0) {
            keys.forEach((key) => {
                currentValue[key] = (currentValue[key] / points) * (100 - val + 0.00001);
            });
        } else {
            const average = (100 - val) / keys.length;
            keys.forEach((key) => {
                currentValue[key] = average;
            });
        }

        this.stageSettingsForm.get('weighting').patchValue(currentValue);
    }

    onHcSliderSlideEnd(e, input) {}

    onSave() {
        const form = this.stageSettingsForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form, form.value);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        this.contentLoading = true;
        this.jobService.updateStage(this.jobId, this.stageId, form.value).subscribe(
            () => {
                this.contentLoading = false;
            },
            (error) => {
                console.log(error);
                this.contentLoading = false;
            }
        );
    }

    onDelete() {
        console.log('onDelete');
        if (this.stageHasCandidate) {
            this.errorModalVisible = true;
        } else {
            this.contentLoading = true;
            this.jobService.removeStage(this.jobId, this.stageId).subscribe(
                () => {
                    this.contentLoading = false;
                    this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.jobId}`);
                },
                (error) => {
                    console.log(error);
                    this.contentLoading = false;
                }
            );
        }
    }

    onShowModal(visible) {
        this.errorModalVisible = visible;
    }

    get actions(): FormArray {
        return this.stageSettingsForm && (this.stageSettingsForm.controls.actions as FormArray);
    }

    createActionItem(type, dataOptions): FormGroup {
        let options;
        if (type === 'spark-hire-video') {
            options = {
                questionnaire_id: [(dataOptions && dataOptions.questionnaire_id) || '', Validators.required],
                send_reminder: [(dataOptions && dataOptions.send_reminder) || true],
                time_allowance: [(dataOptions && dataOptions.time_allowance) || 30]
            };
        }
        return this.fb.group({
            type: [type],
            options: this.fb.group(options || null)
        });
    }

    onActionToggle(type: string) {
        const selected = this.isActionSelected(type);
        if (selected) {
            this.actions.removeAt(this.actions.value.findIndex((a) => a.type === type));
        } else {
            this.actions.push(this.createActionItem(type, null));
        }
    }

    onDeleteAction(type: string) {
        this.actions.removeAt(this.actions.value.findIndex((a) => a.type === type));
    }

    isActionSelected(type: string) {
        const formValue = this.stageSettingsForm.value;
        const actions = formValue.actions.map((a) => a.type);
        return actions.indexOf(type) !== -1 ? true : false;
    }

    onBackClick() {
        this.router.navigateByUrl(`${this.baseUrl}/jobs/${this.jobId}`);
    }

    get assessment(): FormArray {
        return this.stageSettingsForm && (this.stageSettingsForm.controls['assessment'] as FormArray);
    }

    get weighting(): FormArray {
        return this.stageSettingsForm && (this.stageSettingsForm.controls['weighting']['controls'] as FormArray);
    }

    addAssessmentGroup(type) {
        console.log(type);
        let option = [''];
        if (type !== 'video-interview' && type !== 'devskiller') {
            option = ['-'];
        }
        this.assessment.push(
            this.fb.group({
                type: [type],
                option,
                deadline: [5]
            })
        );
        this.assessmentList.push({
            type
        });

        console.log(this.assessment, this.assessmentList, type);
    }

    populateAssessment(assessment) {
        assessment.forEach((c) => {
            this.assessment.push(
                this.fb.group({
                    type: [c.type, Validators.required],
                    option: [c.option, Validators.required],
                    deadline: [c.deadline || 5]
                })
            );
        });
    }

    onDeleteAssessment(ty, index) {
        let type = this.assessment['controls'][index]['controls'].type.value;
        let deletedValue = this.assessment['controls'][index]['controls'].option.value;
        if (type === 'video-interview') {
            let questionnaire = this.questionnaireOptions.find((q) => {
                return q.value === deletedValue;
            });
            if (questionnaire) {
                questionnaire.selected = false;
            }
        } else if (type === 'devskiller') {
            let devskiller = this.devskillerOptions.find((q) => {
                return q.value === deletedValue;
            });
            if (devskiller) {
                devskiller.selected = false;
            }
        }

        this.assessment.removeAt(index);

        let index2 = this.assessmentList.findIndex((c) => c.type === type);
        console.log(this.assessmentList, index2);

        this.assessmentList.splice(index2, 1);
    }

    onAddAssessment(type) {
        const form = this.stageSettingsForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form, form.value);
            return;
        }
        this.addAssessmentGroup(type);
        // if (index >= 0) {
        //     this.assessment.removeAt(index);
        // } else {
        //     this.addAssessmentGroup(type);
        // }
    }

    defineAssessmentStatus2() {
        if (this.job && this.job.stages) {
            this.job.stages.forEach((c) => {
                if (c.assessment) {
                    c.assessment.forEach((b) => {
                        if (b.type === 'devskiller') {
                            if (!this.stageHasCandidate && c.id !== this.stageId) {
                                this.devskillerOptions = this.devskillerOptions.filter((a) => {
                                    return a.value !== b.option;
                                });
                            }
                            if (!this.stageHasCandidate) {
                                let devskiller = this.devskillerOptions.find((q) => {
                                    return q.value === b.option;
                                });
                                if (devskiller) {
                                    devskiller.selected = true;
                                }
                            }
                        } else if (b.type === 'video-interview') {
                            if (!this.stageHasCandidate && c.id !== this.stageId) {
                                this.questionnaireOptions = this.questionnaireOptions.filter((a) => {
                                    return a.value !== b.option;
                                });
                            }
                            if (!this.stageHasCandidate) {
                                let questionnaire = this.questionnaireOptions.find((q) => {
                                    return q.value === b.option;
                                });
                                if (questionnaire) {
                                    questionnaire.selected = true;
                                }
                            }
                        } else if (b.type) {
                            this.assessmentList.push(b);
                            // return false;
                        }
                    });
                }
            });
        }
        console.log(this.assessmentList, this.devskillerOptions);
        this.assessmentListCompleted = true;
        // console.log(this.assessmentList);
    }

    defineAssessmentStatus(type) {
        return this.assessmentList.find((c) => {
            return c.type === type;
        });
    }

    onChangeDropdownOptions(e, i) {
        let index = 0;
        this.assessment['controls'].forEach((c) => {
            if (c['controls'].type.value === 'video-interview') {
                let questionnaire = this.questionnaireOptions.find((q) => {
                    return q.value === c['controls'].option.value;
                });
                if (questionnaire) {
                    questionnaire.selected = true;
                }
            } else if (c['controls'].type.value === 'devskiller') {
                let devskiller = this.devskillerOptions.find((q) => {
                    return q.value === c['controls'].option.value;
                });
                if (devskiller) {
                    devskiller.selected = true;
                }
            }
            if (e.value === c['controls'].option.value) {
                index += 1;
                if (index > 1) {
                    this.assessment['controls'][i]['controls'].option.patchValue(null);
                    this.assessment['controls'][i]['controls'].option.setErrors({ selected: true });
                }
            }
        });
        console.log(e.value, this.questionnaireOptions, this.devskillerOptions);
    }

    isAllOptionsSelected(type) {
        if (type === 'video') {
            return this.questionnaireOptions.every((c) => c.selected);
        } else if (type === 'devskiller') {
            return this.devskillerOptions.every((c) => c.selected);
        }
    }
}
