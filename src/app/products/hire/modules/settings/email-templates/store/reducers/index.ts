import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromEmails from './emails.reducer';

export interface EmailsState {
    email_templates: fromEmails.EmailsListState;
}

export const reducers: ActionReducerMap<EmailsState> = { email_templates: fromEmails.reducer };

export const getEmailsFeatureState = createFeatureSelector<EmailsState>('email_templates');

export const getEmailsState = createSelector(
    getEmailsFeatureState,
    (state: EmailsState) => state.email_templates
);
