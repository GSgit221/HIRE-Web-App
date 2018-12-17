import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as userActions from './../actions/user.action';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: fromServices.UserService) {}

    @Effect() loadUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.LOAD_USER),
        switchMap(() => {
            return this.userService.getUser().pipe(
                map((user) => new userActions.LoadUserSuccess(user)),
                catchError((error) => of(new userActions.LoadUserFail(error)))
            );
        })
    );
}
