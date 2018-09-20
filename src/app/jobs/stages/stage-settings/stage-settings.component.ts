import { FormHelperService } from './../../../services/form-helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobStage } from './../../../models/job-stage';
import { JobService } from './../../../services/job.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'app-stage-settings',
    templateUrl: './stage-settings.component.html',
    styleUrls: ['./stage-settings.component.scss']
})
export class StageSettingsComponent implements OnInit {
    @ViewChild('hcSlider') hcSlider: Slider;
    contentLoading = false;
    stage: JobStage;
    jobId: string;
    stageId: string;
    titleMaxLength: 30;
    stageSettingsForm: FormGroup;



    constructor(
        private jobService: JobService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) {
        this.jobId = this.route.snapshot.paramMap.get('id');
        this.stageId = this.route.snapshot.paramMap.get('stageId');
        this.contentLoading = true;
        this.jobService.getStage(this.jobId, this.stageId).subscribe((stage: JobStage) => {
            this.contentLoading = false;
            this.stage = stage;
            if (this.stage.id === 'applied') {
                this.stageSettingsForm = this.fb.group({
                    resume_matching_threshold: [this.stage.resume_matching_threshold],
                    automatically_progress_matching_threshold: [this.stage.automatically_progress_matching_threshold]
                });

                setTimeout(() => {
                    this.onHcSliderChange();
                }, 100);
            } else {
                console.log('It is not applied form');
                this.stageSettingsForm = this.fb.group({
                    title: [this.stage.title, Validators.required],
                    integration: [this.stage.integration],
                    acceptance_criteria: [this.stage.acceptance_criteria],
                    automatically_progress_meeting_criteria: [this.stage.automatically_progress_meeting_criteria || false]
                });
                setTimeout(() => {
                    this.onHcSliderChange();
                }, 100);
            }
        }, (error) => {
            this.contentLoading = false;
            console.log(error);
            this.router.navigateByUrl('dashboard/jobs/' + this.jobId);
        });
    }

    ngOnInit() {
        this.stageSettingsForm = this.fb.group({
            resume_matching_threshold: [60],
            automatically_progress_matching_threshold: [true]
        });
    }


    onHcSliderChange() {
        const value = (this.stage.id === 'applied')
                        ? this.stageSettingsForm.get('resume_matching_threshold').value
                        : this.stageSettingsForm.get('acceptance_criteria').value;
        if (this.hcSlider) {
            const handler = this.hcSlider.el.nativeElement.children[0].children[1];
            if (handler) {
                handler.innerHTML = value;
            }
        }
    }

    onSave() {
        const form = this.stageSettingsForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
    }
}
