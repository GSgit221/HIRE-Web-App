import { ActivatedRoute } from '@angular/router';
import { JobStage } from './../../../models/job-stage';
import { JobService } from './../../../services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stage-settings',
    templateUrl: './stage-settings.component.html',
    styleUrls: ['./stage-settings.component.scss']
})
export class StageSettingsComponent implements OnInit {
    contentLoading = false;
    stage: JobStage;
    jobId: string;
    stageId: string;


    constructor(private jobService: JobService, private route: ActivatedRoute) {
        this.jobId = this.route.snapshot.paramMap.get('id');
        this.stageId = this.route.snapshot.paramMap.get('stageId');
        this.jobService.getStage(this.jobId, this.stageId).subscribe((stage: JobStage) => {
            this.stage = stage;
        }, (error) => {
            console.log(error);
        });
    }

    ngOnInit() {
        
    }

}
