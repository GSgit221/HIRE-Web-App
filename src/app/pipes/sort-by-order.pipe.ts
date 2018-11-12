import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

    transform(array: any[], field: string): any[] {
        // console.log(array, field);
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(array);
        return array;
    }

}
