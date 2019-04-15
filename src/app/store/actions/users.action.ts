import { Action } from '@ngrx/store';
import { User } from '../../models/user';

export const LOAD_ALL_USERS = '[Dashboard] Load All Users';
export const LOAD_ALL_USERS_FAIL = '[Dashboard] Load All Users Fail';
export const LOAD_ALL_USERS_SUCCESS = '[Dashboard] Load All Users Success';

export class LoadUsers implements Action {
    readonly type = LOAD_ALL_USERS;
}

export class LoadUsersFail implements Action {
    readonly type = LOAD_ALL_USERS_FAIL;
    constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
    readonly type = LOAD_ALL_USERS_SUCCESS;
    constructor(public payload: User[]) {}
}

export const CREATE_USER = '[Dashboard] Create User';
export const CREATE_USER_FAIL = '[Dashboard] Create User Fail';
export const CREATE_USER_SUCCESS = '[Dashboard] Create User Success';

export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: any) {}
}

export class CreateUserFail implements Action {
    readonly type = CREATE_USER_FAIL;
    constructor(public payload: any) {}
}

export class CreateUserSuccess implements Action {
    readonly type = CREATE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export const BULK_DELETE_USERS = '[Dashboard] Bulk Delete Users';
export const BULK_DELETE_USERS_FAIL = '[Dashboard] Bulk Delete Users Fail';
export const BULK_DELETE_USERS_SUCCESS = '[Dashboard] Bulk Delete Users Success';

export class BulkDeleteUsers implements Action {
    readonly type = BULK_DELETE_USERS;
    constructor(public payload: any) {}
}

export class BulkDeleteUsersFail implements Action {
    readonly type = BULK_DELETE_USERS_FAIL;
    constructor(public payload: any) {}
}

export class BulkDeleteUsersSuccess implements Action {
    readonly type = BULK_DELETE_USERS_SUCCESS;
    constructor(public payload: any) {}
}

export type UsersAction =
    | LoadUsers
    | LoadUsersFail
    | LoadUsersSuccess
    | CreateUser
    | CreateUserFail
    | CreateUserSuccess
    | BulkDeleteUsers
    | BulkDeleteUsersFail
    | BulkDeleteUsersSuccess;
