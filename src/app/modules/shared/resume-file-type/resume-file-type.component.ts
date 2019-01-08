import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-resume-file-type',
    templateUrl: './resume-file-type.component.html',
    styleUrls: ['./resume-file-type.component.scss']
})
export class ResumeFileTypeComponent implements OnInit {
    @Input() type: string;
    @Input() name: string;
    fileTypeText = '';
    constructor() {}

    ngOnInit() {
        if (this.type === 'application/pdf') {
            this.fileTypeText = 'pdf';
        } else if (
            [
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.oasis.opendocument.text',
                'text/rtf'
            ].indexOf(this.type) !== -1
        ) {
            this.fileTypeText = 'doc';
        }
        if (this.name) {
            this.fileTypeText = this.name.split('.').pop();
        }
    }
}
