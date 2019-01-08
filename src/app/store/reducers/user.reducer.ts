import { User } from './../../models/user';
import * as fromUser from './../actions/user.action';
export interface UserState {
    entity: User;
    loaded: boolean;
    loading: boolean;
}

export const initialState: UserState = {
    entity: null,
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromUser.UserAction): UserState {
    switch (action.type) {
        case fromUser.LOAD_USER: {
            return {
                ...state,
                loading: true
            };
        }

        case fromUser.LOAD_USER_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromUser.LOAD_USER_SUCCESS: {
            const entity = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                entity
            };
        }
    }

    return state;
}
