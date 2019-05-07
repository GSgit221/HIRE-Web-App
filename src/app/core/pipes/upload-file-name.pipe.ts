import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uploadFileName'
})
export class UploadFileNamePipe implements PipeTransform {
    transform(value: any): any {
        if (value) {
            const fileFieldValue = value.split('\\');
            return fileFieldValue[fileFieldValue.length - 1];
        } else {
            return '';
        }
    }
}
