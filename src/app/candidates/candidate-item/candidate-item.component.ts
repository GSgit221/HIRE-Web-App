import {Component, OnInit} from '@angular/core';

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
    constructor() {}

    ngOnInit() {
    }
    onChangeSection(section: string) {
        this.activeSection = section;
    }
    onChangeInteractivity(section: string) {
        this.activeInteractivity = section;
    }
    onToggleContent(paragraph: string) {
        if (paragraph === 'summary') {
            this.summaryContentShow = !this.summaryContentShow;
        } else if (paragraph === 'experience') {
            this.experienceContentShow = !this.experienceContentShow;
        } else if (paragraph === 'education') {
            this.educationContentShow = !this.educationContentShow;
        }
    }


}
