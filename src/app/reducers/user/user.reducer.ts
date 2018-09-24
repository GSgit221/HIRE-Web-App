import { Action } from '@ngrx/store';
import * as fromUser from './../../actions/user/user.actions';


export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: fromUser.UserActions): State {
    switch (action.type) {
        case fromUser.UserActionTypes.GetAuthUser:
            return state;
        default:
            return state;
    }
}
