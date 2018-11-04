import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromUser from './../../actions/user/user.actions';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';


@Injectable()
export class UserEffects {
    @Effect()
    getUser = this.actions$
        .ofType(fromUser.UserActionTypes.GetAuthUser)
        .pipe(
            switchMap(() => this.http.get(`${environment.apiUrl}/me`)),
            mergeMap((user: User) => [{
                type: fromUser.UserActionTypes.SetAuthUser,
                payload: user
            }])
        );

    constructor(private actions$: Actions, private http: HttpClient) {

    }
}
