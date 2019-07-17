import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'questionnaireType'
})
export class QuestionnaireTypePipe implements PipeTransform {
    transform(value: any): any {
        if (value) {
            switch (value) {
                case 'text':
                    return 'Text';
                case 'video':
                    return 'Video';
                case 'document':
                    return 'Document Upload';
                default:
                    return '';
            }
        } else {
            return '';
        }
    }
}
