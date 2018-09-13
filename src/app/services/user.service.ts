import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    me() {
        return this.http.get(`${environment.api_url}/me`);
    }

    create(tenantId, data) {
        return this.http.post(`${environment.api_url}/tenants/${tenantId}/users`, {data});
    }
}
