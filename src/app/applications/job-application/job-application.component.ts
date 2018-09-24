import {Component, OnInit} from '@angular/core';
import * as closest from 'closest';


@Component({
    selector: 'app-job-application',
    templateUrl: './job-application.component.html',
    styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent implements OnInit {
    mainColor = '#72BF44';
    activeSection = 'start';
    constructor() {
    }

    ngOnInit() {
    }
    onChangeSection(section: string) {
        this.activeSection = section;
    }
    onFocusInput(event) {
        closest(event.target, '.form-block-col').classList.add('focus');

    }
    onBlurInput(event) {
        closest(event.target, '.form-block-col').classList.remove('focus');
    }

}
