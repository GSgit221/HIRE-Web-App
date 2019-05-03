import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';
// load user
export const LOAD_USER = '[Dashboard] Load Authenticated User';
export const LOAD_USER_FAIL = '[Dashboard] Load Authenticated User Fail';
export const LOAD_USER_SUCCESS = '[Dashboard] Load Authenticated User Success';

export class LoadUser implements Action {
    readonly type = LOAD_USER;
}

export class LoadUserFail implements Action {
    readonly type = LOAD_USER_FAIL;
    constructor(public payload: any) {}
}

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: User) {}
}

export type UserAction = LoadUser | LoadUserFail | LoadUserSuccess;
