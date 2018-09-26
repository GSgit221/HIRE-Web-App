import { Job } from './../../models/job';
import { FormHelperService } from './../../services/form-helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-new-candidate-item',
    templateUrl: './new-candidate-item.component.html',
    styleUrls: ['./new-candidate-item.component.scss']
})
export class NewCandidateItemComponent implements OnInit {
    contentLoading = false;
    jobId: string;
    job: Job;
    candidateForm: FormGroup;
    resume: { filename: string, filetype: string, value: string };

    constructor(
        private jobService: JobService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private formHelper: FormHelperService
    ) {
        this.jobId = this.route.snapshot.paramMap.get('jobId');
        console.log(this.jobId);
        this.jobService.getJob(this.jobId).subscribe((job: Job) => this.job = job);
    }

    ngOnInit() {
        this.candidateForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            resume: ['', Validators.required]
        });
    }

    onSave() {
        const form = this.candidateForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        const formData = {
            email: form.value.email,
            resume: this.resume
        };
        console.log(formData);
        this.contentLoading = true;
        this.jobService.createCandidate(this.jobId, formData)
            .subscribe(candidate => {
                console.log(candidate);
                this.contentLoading = false;
                this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
                // TODO: redirect to candidate page
            }, error => {
                console.log(error);
                this.contentLoading = false;
            });

    }

    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                const encodedString: any = reader.result;
                this.resume = {
                    filename: file.name,
                    filetype: file.type,
                    value: encodedString.split(',')[1]
                };
            };
        } else {
            this.resume = {
                filename: null,
                filetype: null,
                value: null
            };
        }
    }

    get resumeField() {
        return this.candidateForm.get('resume');
    }


    onBackClick() {
        this.router.navigateByUrl(`dashboard/jobs/${this.jobId}`);
    }

}
