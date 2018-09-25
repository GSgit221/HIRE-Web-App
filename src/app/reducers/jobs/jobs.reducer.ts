import { Action } from '@ngrx/store';


export interface State {

}

export const initialState: State = {
    jobs: {},
    currentJob: null
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {

        default:
            return state;
    }
}
