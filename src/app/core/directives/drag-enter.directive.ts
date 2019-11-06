import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    /*HostListener, */ Input,
    OnInit,
    Output
} from '@angular/core';

@Directive({
    selector: '[appDragEnter]'
})
export class DragEnterDirective implements OnInit {
    @Output('dropFile') fileDrop = new EventEmitter<File[]>();
    @Output('dragOverFile') fileDragOver = new EventEmitter<boolean>();
    @Input() appDragEnter: string;
    @HostBinding('class.over')
    active = false;
    // captureBody = false;
    supportedFileTypes: string[] = [];

    constructor(private _elementRef: ElementRef, private cdr: ChangeDetectorRef) {
        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    ngOnInit() {
        const el = this.appDragEnter === 'body' ? document.body : this._elementRef.nativeElement;
        el.addEventListener('dragenter', this.onDragEnter.bind(this), true);
        el.addEventListener('dragleave', this.onDragLeave.bind(this), true);
        el.addEventListener('dragover', this.onDragOver.bind(this), true);
        el.addEventListener('drop', this.onDrop.bind(this), true);
    }

    isFileDrag(e) {
        return e.dataTransfer.types && e.dataTransfer.types[0] ? e.dataTransfer.types[0] === 'Files' : false;
    }

    // @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        console.log('onDROP FILE', event);
        this.cdr.detectChanges();
        event.preventDefault();
        if (!this.active) return;

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
        console.log('files', dataTransfer.files);

        this.active = false;
    }

    // @HostListener('dragenter', ['$event'])
    onDragEnter(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.active) {
            this.active = true;
        }
        // console.log('dragenter', this.active);
    }

    // @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.active) {
            this.active = true;
            this.fileDragOver.emit(false);
        }
        // console.log('dragover', this.active);
    }

    // @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (this.active) {
            this.active = false;
            this.fileDragOver.emit(true);
        }
        // console.log('dragleave', this.active);
    }

    // @HostListener('body:dragenter', ['$event'])
    // onBodyDragEnter(event: DragEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if (!this.active && this.captureBody) {
    //         this.active = true;
    //     }
    //     console.log('body:dragenter', this.active);
    // }

    // @HostListener('body:dragover', ['$event'])
    // onBodyDragOver(event: DragEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if (!this.active && this.captureBody) {
    //         this.active = true;
    //     }
    //     console.log('body:dragover', this.active);
    // }

    // @HostListener('body:dragleave', ['$event'])
    // onBodyDragLeave(event: DragEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if (this.active && this.captureBody) {
    //         this.active = false;
    //     }
    //     console.log('body:dragLeave', this.active);
    // }

    // @HostListener('body:drop', ['$event'])
    // onBodyDrop(event: DragEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     if (this.captureBody) {
    //         this.onDrop(event);
    //     }
    // }
}
