import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromUsers from './users.reducer';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    user: fromUser.UserState;
    users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    user: fromUser.reducer,
    users: fromUsers.reducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;

        return { url, queryParams, params };
    }
}

export const getUserState = createFeatureSelector<fromUser.UserState>('user');
export const getUserLoading = createSelector(
    getUserState,
    (state: fromUser.UserState) => state.loading
);
export const getUserLoaded = createSelector(
    getUserState,
    (state: fromUser.UserState) => state.loaded
);
export const getUserEntity = createSelector(
    getUserState,
    (state: fromUser.UserState) => state.entity
);

export const getUsersState = createFeatureSelector<fromUsers.UsersState>('users');
export const getUsersLoading = createSelector(
    getUsersState,
    (state: fromUsers.UsersState) => state.loading
);
export const getUsersLoaded = createSelector(
    getUsersState,
    (state: fromUsers.UsersState) => state.loaded
);
export const getUsersEntities = createSelector(
    getUsersState,
    (state: fromUsers.UsersState) => state.entities
);
