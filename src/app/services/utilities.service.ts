import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor(private http: HttpClient) { }

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

    getCountries() {
        return this.http.get(`${environment.apiUrl}/countries`);
    }
    isEqual(obj1, obj2) {
        var i, l, leftChain = [], rightChain = [];

        function compare2Objects(x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.     
            // Check if both arguments link to the same object.
            // Especially useful on the step where we compare prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good as we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object being a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (!compare2Objects(obj1, obj2)) {
            return false;
        }

        return true;
    }
}
