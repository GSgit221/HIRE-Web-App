import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from './../../core/models/user';

import * as fromServices from '../../core/services';
import * as usersActions from './../actions/users.action';

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private userService: fromServices.UserService) {}
    @Effect() loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType(usersActions.LOAD_ALL_USERS),
        switchMap(() => {
            return this.userService.getUsers().pipe(
                map((users) => new usersActions.LoadUsersSuccess(users)),
                catchError((error) => of(new usersActions.LoadUsersFail(error)))
            );
        })
    );

    @Effect() createUser$: Observable<Action> = this.actions$.pipe(
        ofType(usersActions.CREATE_USER),
        map((action: usersActions.CreateUser) => action.payload),
        switchMap((data) => {
            return this.userService.create(data).pipe(
                map((user: User) => new usersActions.CreateUserSuccess(user)),
                catchError((error) => of(new usersActions.CreateUserFail(error)))
            );
        })
    );

    @Effect() bulkDeleteUsers$: Observable<Action> = this.actions$.pipe(
        ofType(usersActions.BULK_DELETE_USERS),
        map((action: usersActions.BulkDeleteUsers) => action.payload),
        switchMap((usersToRemove) => {
            return this.userService.bulkDeleteUsers(usersToRemove).pipe(
                map(() => new usersActions.BulkDeleteUsersSuccess(usersToRemove)),
                catchError((error) => of(new usersActions.BulkDeleteUsersFail(error)))
            );
        })
    );
}
