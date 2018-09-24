import { User } from './../../models/user';
import { Action } from '@ngrx/store';


export const GET_AUTH_USER = 'GET_AUTH_USER';
export const CREATE_TENANT_USER = 'CREATE_TENANT_USER';

export enum UserActionTypes {
    GetAuthUser = '[User] Get Authenticated User'
}

export class GetAuthUser implements Action {
    readonly type = UserActionTypes.GetAuthUser;
    payload: User;
}

export type UserActions = GetAuthUser;
