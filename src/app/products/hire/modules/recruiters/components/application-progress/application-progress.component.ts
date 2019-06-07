import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-application-progress',
    templateUrl: './application-progress.component.html',
    styleUrls: ['./application-progress.component.scss']
})
export class ApplicationProgressComponent implements OnInit {
    _value = 0;
    dashoffset;
    dasharray;
    radius = 30;
    percent;
    @Input() set value(val: number) {
        this._value = val;
        this.updateProgress();
    }
    constructor() {}
    ngOnInit() {
        this.updateProgress();
    }
    updateProgress() {
        this.dasharray = this.radius * 2 * Math.PI;
        this.dashoffset = ((100 - this._value) / 100) * this.dasharray;
    }
}
