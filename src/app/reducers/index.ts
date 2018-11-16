import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromJobs from './jobs/jobs.reducer';
import * as fromUser from './user/user.reducer';

export interface State {
    user: fromUser.State;
    jobs: fromJobs.State;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    jobs: fromJobs.reducer
};

export const metaReducers: Array<MetaReducer<State>> = !environment.production ? [] : [];
