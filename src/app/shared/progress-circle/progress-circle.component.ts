import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress-circle',
    templateUrl: './progress-circle.component.html',
    styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {
    @Input()
    set progress(progress: number) {
        this.progressVal = progress;
        this.svgOffset = 100 - progress;
    }
    svgOffset = 100;
    progressVal = 0;
    constructor() {}

    ngOnInit() {
        this.svgOffset = 100 - this.progress;
    }
}
