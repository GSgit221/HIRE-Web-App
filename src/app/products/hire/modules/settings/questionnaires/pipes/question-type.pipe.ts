import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {
    transform(value: any): any {
        if (value) {
            switch (value) {
                case 'single':
                    return 'Single Choice';
                case 'multiple':
                    return 'Multiple Choice';
                case 'text-field':
                    return 'Text Field';
                case 'paragraph':
                    return 'Paragraph';
                case 'stars':
                    return 'Star Rating';
                case 'one-way-video':
                    return 'Video';
                case 'document-upload':
                    return 'Document Upload';
                default:
                    return '';
            }
        } else {
            return '';
        }
    }
}
