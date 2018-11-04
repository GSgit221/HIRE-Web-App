import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
    constructor(private http: HttpClient) { }

    resolve() {
        return this.http.get(`${environment.apiUrl}/me`);
    }
}
