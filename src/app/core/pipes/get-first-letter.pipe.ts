import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getFirstLetter'
})
export class GetFirstLetterPipe implements PipeTransform {
    transform(value: string, args: any[]): string | boolean {
        if (value === null) {
            return '';
        }
        const firstWords = [];
        for (const item of value) {
            firstWords.push(item.split(' ')[0]);
        }
        return firstWords[0];
    }
}
