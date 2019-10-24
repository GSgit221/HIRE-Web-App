import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-candidate-block',
    templateUrl: './candidate-block.component.html',
    styleUrls: ['./candidate-block.component.scss']
})
export class CandidateBlockComponent implements OnInit {
    @Input() candidate: any;
    @Input() selected: boolean;
    @Output() onSelect = new EventEmitter<string>();
    constructor() {}

    ngOnInit() {}
    titleCase(str: string) {
        return str
            .replace(/#/g, '')
            .split(/[-|_]/g)
            .join(' ')
            .replace(/\w*\S/g, (t) => t[0].toUpperCase() + t.substr(1));
    }

    onSelectCandidateClick(event, candidateId) {
        event.preventDefault();
        event.stopPropagation();
        this.onSelect.next(candidateId);
    }
}
