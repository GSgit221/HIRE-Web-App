import { createSelector } from '@ngrx/store';
import { EmailTemplate } from './../../../../../../../core/models/email-template';

import * as fromRoot from '../../../../../../../store';
import * as fromFeature from '../reducers';
import * as fromEmails from '../reducers/emails.reducer';

export const getEmailsEntities = createSelector(
    fromFeature.getEmailsState,
    fromEmails.getEmailEntities
);

export const getAllEmails = createSelector(
    getEmailsEntities,
    (entities) => {
        return Object.keys(entities).map((id) => entities[id]);
    }
);

export const getEmailsLoading = createSelector(
    fromFeature.getEmailsState,
    fromEmails.getEmailsLoading
);

export const getEmailsLoaded = createSelector(
    fromFeature.getEmailsState,
    fromEmails.getEmailsLoaded
);

export const getSelectedEmail = createSelector(
    getEmailsEntities,
    fromRoot.getRouterState,
    (entities, router): EmailTemplate => {
        return router.state && entities[router.state.params.emailTemplateId];
    }
);
