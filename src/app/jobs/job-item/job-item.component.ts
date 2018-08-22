import { JobService } from './../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-job-item',
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
    job: Object = {};

    jobTypeOptions: SelectItem[];
    educationOptions: SelectItem[];
    hiresOptions: SelectItem[];
    experienceOptions: SelectItem[];
    salaryOptions: SelectItem[];
    joblistingOptions: SelectItem[];
    questionnaireOptions: SelectItem[];
    applicationFieldsOptions: SelectItem[];
    jobDescription: string;

    activeSection = 'job-details';
    contentLoading = true;


    constructor(private route: ActivatedRoute, private jobService: JobService) {
        this.jobService.getJob(this.route.snapshot.paramMap.get('id'))
            .subscribe(job => {
                console.log(job);
                this.contentLoading = false;
            });


        this.jobTypeOptions = [
            { label: 'Part-time', value: 'part-time' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Temporary', value: 'temporary' },
            { label: 'Contract', value: 'contract' }
        ];

        this.hiresOptions = [
            { label: '1 hire', value: 1 },
            { label: '2 hires', value: 2 },
            { label: '3 hires', value: 3 },
            { label: '4 hires', value: 4 },
            { label: '5 hires', value: 5 },
            { label: '6 hires', value: 6 },
            { label: '7 hires', value: 7 },
            { label: '8 hires', value: 8 },
            { label: '9 hires', value: 9 },
            { label: '10 hires', value: 10 },
            { label: 'Ongoing', value: 'ongoing' }
        ];


        this.educationOptions = [
            { label: 'Unspecified', value: 'unspecified' },
            { label: 'High School or Equivalent', value: 'school' },
            { label: 'Certification', value: 'certification' },
            { label: 'Vocational', value: 'vocational' },
            { label: 'Associate Degree', value: 'associate' },
            { label: 'Bachelors Degree', value: 'bachelors' },
            { label: 'Masters Degree', value: 'masters' },
            { label: 'Professional', value: 'professional' }
        ];

        this.experienceOptions = [
            { label: 'Internship', value: 'internship' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Entry Level', value: 'entry' },
            { label: 'Associate', value: 'associate' },
            { label: 'Mid Level', value: 'mid' },
            { label: 'Senior', value: 'senior' },
            { label: 'Executive', value: 'executive' }
        ];

        this.salaryOptions = [
            { label: 'per year', value: 'yearly' },
            { label: 'per month', value: 'monthly' }
        ];

        this.joblistingOptions = [
            { label: 'Default', value: 'default' }
        ];

        this.questionnaireOptions = [];

        this.applicationFieldsOptions = [
            { label: 'Required', value: 'required' },
            { label: 'Optional', value: 'optional' },
            { label: 'Disabled', value: 'disabled' }
        ];
    }

    ngOnInit() {
    }


    onChangeSection(section: string) {
        this.activeSection = section;
    }

    onSaveDraft(event) {
        event.preventDefault();
    }

    onSave(event) {
        event.preventDefault();
    }
}
