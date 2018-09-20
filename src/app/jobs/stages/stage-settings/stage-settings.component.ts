import { FormHelperService } from './../../../services/form-helper.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    @ViewChild('thresholdSlider') thresholdSlider: Slider;
    contentLoading = false;
    stage: JobStage;
    jobId: string;
    stageId: string;
    stageSettingsForm: FormGroup;



    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) {
        this.jobId = this.route.snapshot.paramMap.get('id');
        this.stageId = this.route.snapshot.paramMap.get('stageId');
        this.jobService.getStage(this.jobId, this.stageId).subscribe((stage: JobStage) => {
            this.stage = stage;

            if (this.stage.id === 'applied') {
                this.stageSettingsForm = this.fb.group({
                    resume_matching_threshold: [this.stage.resume_matching_threshold],
                    automatically_progress_matching_threshold: [this.stage.automatically_progress_matching_threshold]
                });
                this.onThresholdSliderChange();

            } else {
                console.log('It is not applied form');
            }

        }, (error) => {
            console.log(error);
        });
    }

    ngOnInit() {
        this.stageSettingsForm = this.fb.group({
            resume_matching_threshold: [60],
            automatically_progress_matching_threshold: [true]
        });
    }


    onThresholdSliderChange() {
        const value = this.stageSettingsForm.get('resume_matching_threshold').value;
        const handler = this.thresholdSlider.el.nativeElement.children[0].children[1];
        if (handler) {
            handler.innerHTML = value;
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
