import { EmailTemplate } from './../../../../../core/models/email-template';

import * as fromEmailsActions from '../actions/emails.action';

export interface EmailsListState {
    entities: { [id: string]: EmailTemplate };
    loaded: boolean;
    loading: boolean;
}

export const initialState: EmailsListState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromEmailsActions.EmailsAction): EmailsListState {
    switch (action.type) {
        case fromEmailsActions.LOAD_EMAILS: {
            return { ...state, loading: true };
        }

        case fromEmailsActions.LOAD_EMAILS_FAIL: {
            return { ...state, loading: false, loaded: false };
        }

        case fromEmailsActions.LOAD_EMAILS_SUCCESS: {
            const emails = action.payload;
            const entities = emails.reduce(
                (_entities: { [id: string]: EmailTemplate }, email) => {
                    return {
                        ..._entities,
                        [email.id]: email
                    };
                },
                {
                    ...state.entities
                }
            );
            return { ...state, loading: false, loaded: true, entities };
        }

        case fromEmailsActions.CREATE_EMAIL_SUCCESS: {
            const email = action.payload;
            const entities = { ...state.entities, [email.id]: email };
            return { ...state, entities };
        }

        case fromEmailsActions.UPDATE_EMAIL_SUCCESS: {
            const email = action.payload;
            console.log('UPDATE EMAIL SUCCESS', email);
            const entities = { ...state.entities, [email.id]: email };
            return { ...state, entities };
        }

        case fromEmailsActions.BULK_DELETE_EMAILS_SUCCESS: {
            const ids = action.payload;
            const entities = { ...state.entities };
            ids.forEach((id) => {
                delete entities[id];
            });
            return { ...state, entities };
        }
    }

    return state;
}

export const getEmailsLoading = (state: EmailsListState) => state.loading;
export const getEmailsLoaded = (state: EmailsListState) => state.loaded;
export const getEmailEntities = (state: EmailsListState) => state.entities;
