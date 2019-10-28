import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appDragEnter]'
})
export class DragEnterDirective implements OnInit {
    @Input() appDragEnter: string;
    @Input() appDragEnterParentClass: string;
    @Output() dropFile = new EventEmitter<File>();
    supportedFileTypes: string[] = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.oasis.opendocument.text',
        'text/rtf'
    ];
    first: boolean = false;
    second: boolean = false;

    element: any = null;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit() {
        this.element = this.appDragEnter === 'body' ? document.body : this._elementRef.nativeElement;

        if (this.appDragEnter === 'body') {
            document.body.addEventListener('dragenter', this.onDragEnter.bind(this));
            document.body.addEventListener('dragleave', this.onDragLeave.bind(this));
            document.body.addEventListener('dragover', this.onDragOver.bind(this));
            document.body.addEventListener('drop', this.onDrop.bind(this));
        }
    }

    get parentNode() {
        return this.element.parentNode;
    }

    getDataType(e) {
        return e.dataTransfer.types && e.dataTransfer.types[0] ? e.dataTransfer.types[0] : null;
    }

    isAppDataType(e) {
        return (
            this.appDragEnter &&
            e.dataTransfer &&
            e.dataTransfer.types &&
            e.dataTransfer.types[1] &&
            this.appDragEnter === e.dataTransfer.types[1]
        );
    }

    getFileType(e) {
        return e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items[0] && e.dataTransfer.items[0].type
            ? e.dataTransfer.items[0].type
            : null;
    }

    @HostListener('dragenter', ['$event']) onDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.getDataType(e) === 'Files') {
            this.element.classList.add('over');
            e.dataTransfer.dropEffect = 'move';
        }
    }

    @HostListener('dragleave', ['$event']) onDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.element.classList.remove('over');
        if (this.appDragEnterParentClass && this.getDataType(e) !== 'Files') {
            this.parentNode.classList.remove(this.appDragEnterParentClass);
        }
    }

    @HostListener('dragover', ['$event']) onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.getDataType(e) === 'Files') {
            this.element.classList.add('over');
            e.dataTransfer.dropEffect = 'move';
        } else if (this.isAppDataType(e)) {
            if (this.appDragEnterParentClass) {
                this.parentNode.classList.add(this.appDragEnterParentClass);
            }
            this.element.classList.add('over');
            e.dataTransfer.dropEffect = 'move';
        }
    }

    @HostListener('drop', ['$event']) onDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.appDragEnterParentClass) {
            this.parentNode.classList.remove(this.appDragEnterParentClass);
        }
        if (this.getFileType(e) !== 'text/plain') {
            this.dropFile.emit(e);
            this.element.classList.remove('over');
        }
    }

    ngOnDestroy(): void {
        if (this.appDragEnter === 'body') {
            document.body.removeEventListener('dragenter', this.onDragEnter.bind(this), false);
            document.body.removeEventListener('dragleave', this.onDragLeave.bind(this), false);
            document.body.removeEventListener('dragover', this.onDragOver.bind(this), false);
            document.body.removeEventListener('drop', this.onDrop.bind(this), false);
        }
    }
}
