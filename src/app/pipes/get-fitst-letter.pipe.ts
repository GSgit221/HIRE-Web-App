import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getFitstLetter'
})
export class GetFitstLetterPipe implements PipeTransform {

    transform(value: string, args: any[]): string | boolean {
        if (value === null) { return ''; }
        const firstWords = [];
        for (let i = 0; i < value.length; i++) {
            const words = value[i].split(' ');
            firstWords.push(words[0]);
        }
        return firstWords[0];
    }
}
