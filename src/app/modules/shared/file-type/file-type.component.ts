import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-type',
    templateUrl: './file-type.component.html',
    styleUrls: ['./file-type.component.scss']
})
export class FileTypeComponent implements OnInit {
    @Input() type: string;
    imgType = 1;
    fileTypeText = '';
    constructor() {}

    ngOnInit() {
        // this.fileTypeText;
        if (this.type === 'application/pdf') {
            this.fileTypeText = 'pdf';
            this.imgType = 1;
        } else if (
            [
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.oasis.opendocument.text',
                'text/rtf'
            ].indexOf(this.type) !== -1
        ) {
            this.fileTypeText = 'doc';
            this.imgType = 4;
        }
    }
}
