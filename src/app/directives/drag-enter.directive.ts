import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appDragEnter]'
})
export class DragEnterDirective implements OnInit {
    @Input() appDragEnter: string;
    @Output() dropFile = new EventEmitter<File>();
    supportedFileTypes: string[];
    constructor(private _elementRef: ElementRef) {
        this.supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'text/rtf'
        ];
    }

    ngOnInit() {
        // Get the current element
        const el = this._elementRef.nativeElement;

        // Add a style to indicate that this element is a drop target
        el.addEventListener('dragenter', (e) => {
            // console.log('dragenter', e);
            // el.classList.add('over');
        });

        // Remove the style
        el.addEventListener('dragleave', (e) => {
            el.classList.remove('over');
        });

        el.addEventListener('dragover', (e) => {
            // const fileType = e.dataTransfer
            //     && e.dataTransfer.items
            //     && e.dataTransfer.items[0]
            //     && e.dataTransfer.items[0].type ? e.dataTransfer.items[0].type : null;

            const type =
                e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types[0] ? e.dataTransfer.types[0] : null;
            if (type === 'Files') {
                el.classList.add('over');
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
                return false;
            }
        });

        // On drop, get the data and convert it back to a JSON object
        // and fire off an event passing the data
        el.addEventListener('drop', (e) => {
            const fileType =
                e.dataTransfer &&
                e.dataTransfer.items &&
                e.dataTransfer &&
                e.dataTransfer.items[0] &&
                e.dataTransfer.items[0].type
                    ? e.dataTransfer.items[0].type
                    : null;
            // console.log(fileType);
            if (fileType && fileType !== 'text/plain') {
                if (e.stopPropagation) {
                    e.stopPropagation(); // Stops some browsers from redirecting.
                }
                this.dropFile.emit(e);
                e.preventDefault();

                el.classList.remove('over');
                // const data = JSON.parse(e.dataTransfer.getData('text'));
                return false;
            }
        });
    }

    private validateFileType(type: string, types: string[]) {
        return types.indexOf(type) !== -1;
    }
}
