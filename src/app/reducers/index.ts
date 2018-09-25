import { Job } from './../models/job';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';
import * as fromJobs from './jobs/jobs.reducer';
import { User } from '../models/user';

export interface State {
    user: fromUser.State;
    jobs: fromJobs.State;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    jobs: fromJobs.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
