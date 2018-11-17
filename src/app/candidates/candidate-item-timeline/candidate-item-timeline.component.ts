import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-candidate-item-timeline',
    templateUrl: './candidate-item-timeline.component.html',
    styleUrls: ['./candidate-item-timeline.component.scss']
})
export class CandidateItemTimelineComponent implements OnInit {
    @Input() candidate;
    @Input() jobId;
    timeline;
    constructor() { }

    ngOnInit() {
        this.timeline = this.candidate.feedback[this.jobId].comments;
        this.timeline.sort((a, b) => {
            return a.created - b.created;
        });
        // console.log(this.timeline);

    }

}
