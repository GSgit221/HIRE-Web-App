import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() { }

    readFile(file) {
        return new Promise((resolve, reject) => {
            // console.log(file);
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

    generateUID(length = 5) {
        let pool1: any = 'ABCDEFGHIJKLMNOPQRSTUVQWXYZ';
        let pool2: any = '123456789ABCDEFGHIJKLMNOPQRSTUVQWXYZ';
        let shuffled = '';
        let charIndex = 0;
        pool1 = pool1.split('');
        pool2 = pool2.split('');
        const firstLetterIndex = Math.floor(pool1.length * Math.random());
        while (pool2.length > 0) {
            charIndex = Math.floor(pool2.length * Math.random());
            shuffled += pool2[charIndex];
            pool2.splice(charIndex, 1);
        }
        return pool1[firstLetterIndex] + shuffled.substring(0, length - 1);
    }

    getTenant() {
        const url = window.location.hostname.split('.hire');
        let tenant = (url[0] && url[0].indexOf('.') === -1) ? url[0] : 'undefined';
        // TEMPORARY
        if (tenant === 'dev' || tenant === 'undefined') {
            tenant = 'dimensiondata';
        }
        return tenant;
    }

    isLocalDevelopment() {
        const url = window.location.hostname;
        return (url.indexOf('hire.local') !== -1);
    }
}
