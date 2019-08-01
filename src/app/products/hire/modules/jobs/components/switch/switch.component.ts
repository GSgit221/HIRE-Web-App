import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
    @Input() value: boolean;
    @Output() onChange = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    handleChange({ checked }) {
        this.onChange.next(checked);
    }
}
