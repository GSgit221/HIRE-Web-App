import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './../reducers/user.reducer';

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
