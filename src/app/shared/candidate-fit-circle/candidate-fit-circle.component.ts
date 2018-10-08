import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-candidate-fit-circle',
    templateUrl: './candidate-fit-circle.component.html',
    styleUrls: ['./candidate-fit-circle.component.scss']
})
export class CandidateFitCircleComponent implements OnInit {
    @Input() value;
    dashoffset;
    dasharray;
    radius = 30;
    constructor() {
    }
    ngOnInit() {
        this.dasharray = this.radius * 2 * Math.PI;
        this.dashoffset = ((100 - this.value) / 100) * this.dasharray;
        if (this.value > 95) {
            this.dashoffset += 5;
        }
    }
}
