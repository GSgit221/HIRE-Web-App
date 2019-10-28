import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appDragEnter]'
})
export class DragEnterDirective {
    @Output('dropFile') fileDrop = new EventEmitter<File[]>();
    @Input() preventBodyDrop = true;
    @Input() appDragEnter: string;

    @HostBinding('class.over')
    active = false;
    supportedFileTypes: string[] = [];

    constructor(private _elementRef: ElementRef) {
        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    isFileDrag(e) {
        return e.dataTransfer.types && e.dataTransfer.types[0] ? e.dataTransfer.types[0] === 'Files' : false;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        if (!this.active) return;
        this.active = false;

        const { dataTransfer } = event;

        if (dataTransfer.items) {
            const files = [];
            /* tslint:disable */
            for (let i = 0; i < dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (dataTransfer.items[i].kind === 'file') {
                    files.push(dataTransfer.items[i].getAsFile());
                }
            }
            /* tslint:enable */
            dataTransfer.items.clear();
            this.fileDrop.emit(files);
        } else {
            const files = dataTransfer.files;
            dataTransfer.clearData();
            this.fileDrop.emit(Array.from(files));
        }
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();
        if (this.isFileDrag(event)) {
            this.active = true;
        }
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
        if (this.appDragEnter !== 'body') {
            this.active = false;
        }
    }

    @HostListener('body:dragover', ['$event'])
    onBodyDragOver(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
            event.stopPropagation();

            if (this.appDragEnter === 'body' && this.isFileDrag(event)) {
                this.active = true;
            }
        }
    }

    @HostListener('body:dragLeave', ['$event'])
    onBodyDragLeave(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
            event.stopPropagation();

            this.active = false;
        }
    }

    @HostListener('body:drop', ['$event'])
    onBodyDrop(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();

            if (this.active) {
                this.onDrop(event);
            }
        }
    }
}
