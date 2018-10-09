import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() {}

    readFile(file) {
        return new Promise((resolve, reject) => {
            console.log(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result: any = reader.result;
                resolve({
                    name: file.name,
                    size: file.size,
                    mimetype: file.type,
                    data: result.split(',')[1],
                });
            };
        });
    }
}
