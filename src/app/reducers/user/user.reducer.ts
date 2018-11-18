import * as fromUser from './../../actions/user/user.actions';

/* tslint:disable */
export interface State {}
/* tslint:enable */

export const initialState: State = null;

export function reducer(state = initialState, action: fromUser.UserActions): State {
    switch (action.type) {
        case fromUser.UserActionTypes.SetAuthUser:
            return action.payload;
        default:
            return state;
    }
}
