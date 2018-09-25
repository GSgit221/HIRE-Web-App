import { Action } from '@ngrx/store';
import * as fromUser from './../../actions/user/user.actions';


export interface State {

}

export const initialState: State = null;

export function reducer(state = initialState, action: fromUser.UserActions): State {
    switch (action.type) {
        case fromUser.UserActionTypes.SetAuthUser:
            return action.payload;
        default:
            return state;
    }
}
