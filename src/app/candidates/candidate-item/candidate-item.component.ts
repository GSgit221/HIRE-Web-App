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
    constructor() {}

    ngOnInit() {
    }
    onChangeSection(section: string) {
        this.activeSection = section;
    }
    onChangeInteractivity(section: string) {
        this.activeInteractivity = section;
    }

}
