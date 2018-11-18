import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import * as fromUser from './../../actions/user/user.actions';

@Injectable()
export class UserEffects {
    @Effect()
    getUser = this.actions$.pipe(
        ofType(fromUser.UserActionTypes.GetAuthUser),
        switchMap(() => this.http.get(`${environment.apiUrl}/me`)),
        mergeMap((user: User) => [
            {
                type: fromUser.UserActionTypes.SetAuthUser,
                payload: user
            }
        ])
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
