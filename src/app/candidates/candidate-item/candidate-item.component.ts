import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-candidate-item',
    templateUrl: './candidate-item.component.html',
    styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
    activeSection = 'overview';
    activeInteractivity = 'chat';
    predictiveIndex: number = 75;
    summaryContentShow:boolean = true;
    experienceContentShow:boolean = true;
    educationContentShow:boolean = true;
    constructor() {}

    ngOnInit() {
    }
    onChangeSection(section: string) {
        this.activeSection = section;
    }
    onChangeInteractivity(section: string) {
        this.activeInteractivity = section;
    }
    toggleSummaryContent() {
        this.summaryContentShow = !this.summaryContentShow;
    }
    toggleExperienceContent() {
        this.experienceContentShow = !this.experienceContentShow;
    }
    toggleEducationContent() {
        this.educationContentShow = !this.educationContentShow;
    }

}
