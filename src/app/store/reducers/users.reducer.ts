import { User } from './../../models/user';
import * as fromUser from './../actions/user.action';
export interface UsersState {
    entities: User[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: UsersState = {
    entities: [],
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromUser.UserAction): UsersState {
    switch (action.type) {
        case fromUser.LOAD_ALL_USERS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromUser.LOAD_ALL_USERS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromUser.LOAD_ALL_USERS_SUCCESS: {
            const entities = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }
    }

    return state;
}
