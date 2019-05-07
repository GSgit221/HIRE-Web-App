import { User } from './../../core/models/user';
import * as fromUsers from './../actions/users.action';
export interface UsersState {
    entities: User[];
    loaded: boolean;
    loading: boolean;
    error: null;
}

export const initialState: UsersState = {
    entities: [],
    loaded: false,
    loading: false,
    error: null
};

export function reducer(state = initialState, action: fromUsers.UsersAction): UsersState {
    switch (action.type) {
        case fromUsers.LOAD_ALL_USERS: {
            return { ...state, loading: true, error: null };
        }

        case fromUsers.LOAD_ALL_USERS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromUsers.LOAD_ALL_USERS_SUCCESS: {
            const entities = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                entities,
                error: null
            };
        }

        case fromUsers.CREATE_USER: {
            return { ...state, loading: true };
        }

        case fromUsers.CREATE_USER_SUCCESS: {
            const entities = [...state.entities];
            entities.push(action.payload);
            return { ...state, loading: false, loaded: true, entities, error: null };
        }

        case fromUsers.CREATE_USER_FAIL: {
            return { ...state, loading: false, loaded: true, error: action.payload };
        }

        case fromUsers.BULK_DELETE_USERS_SUCCESS: {
            const ids = action.payload;
            const entities = [...state.entities];
            ids.forEach((id) => {
                const itemIndex = entities.findIndex((val) => val.id === id);
                if (itemIndex > -1) {
                    entities.splice(itemIndex);
                }
            });
            return { ...state, entities, error: null };
        }

        case fromUsers.BULK_DELETE_USERS_FAIL: {
            return { ...state, loading: false, loaded: true, error: action.payload };
        }
    }

    return state;
}
