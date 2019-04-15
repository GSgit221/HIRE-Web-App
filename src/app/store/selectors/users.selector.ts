import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './../reducers/users.reducer';

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

export const getUsersError = createSelector(
    getUsersState,
    (state: fromUsers.UsersState) => state.error
);
