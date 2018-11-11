import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-candidate-fit-circle',
    templateUrl: './candidate-fit-circle.component.html',
    styleUrls: ['./candidate-fit-circle.component.scss']
})
export class CandidateFitCircleComponent implements OnInit {
    @Input() value: number;
    @Input() title: string;
    text: string;
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

        if (this.value >= 60) {
            this.text = 'Good';
        } else if (this.value >= 50 && this.value < 60) {
            this.text = 'Average';
        } else if (this.value < 50) {
            this.text = 'Poor';
        }
    }
}
