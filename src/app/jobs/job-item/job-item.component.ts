import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
    selector: 'app-job-item',
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
    jobTypeOptions: SelectItem[];
    educationOptions: SelectItem[];
    hiresOptions: SelectItem[];
    experienceOptions: SelectItem[];

    salaryOptions: SelectItem[];

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '25rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        uploadUrl: 'v1/images', // if needed
        customClasses: [ // optional
            {
                name: "quote",
                class: "quote",
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ]
    };


    constructor() {
        this.jobTypeOptions = [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' }
        ];

        this.educationOptions = [
            { label: 'Bachelors Degree', value: 'bachelors' },
            { label: 'Masters Degree', value: 'masters' }
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
            { label: '10 hires', value: 10 }
        ];

        this.experienceOptions = [
            { label: 'Junior Level', value: 'junior' },
            { label: 'Mid Level', value: 'mid' },
            { label: 'Senior Level', value: 'senior' }
        ];

        this.salaryOptions = [
            { label: 'per year', value: 'yearly' },
            { label: 'per month', value: 'monthly' }
        ];

    }

    ngOnInit() {
    }

}
