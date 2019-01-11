import { Action } from '@ngrx/store';
import { EmailTemplate } from './../../../../../models/email-template';

// load emails
export const LOAD_EMAILS = '[Emails] Load Emails';
export const LOAD_EMAILS_FAIL = '[Emails] Load Emails Fail';
export const LOAD_EMAILS_SUCCESS = '[Emails] Load Emails Success';

export class LoadEmails implements Action {
    readonly type = LOAD_EMAILS;
}

export class LoadEmailsFail implements Action {
    readonly type = LOAD_EMAILS_FAIL;
    constructor(public payload: any) {}
}

export class LoadEmailsSuccess implements Action {
    readonly type = LOAD_EMAILS_SUCCESS;
    constructor(public payload: EmailTemplate[]) {}
}

// create email
export const CREATE_EMAIL = '[Emails] Create Email';
export const CREATE_EMAIL_FAIL = '[Emails] Create Email Fail';
export const CREATE_EMAIL_SUCCESS = '[Emails] Create Email Success';

export class CreateEmail implements Action {
    readonly type = CREATE_EMAIL;
    constructor(public payload: EmailTemplate) {}
}

export class CreateEmailFail implements Action {
    readonly type = CREATE_EMAIL_FAIL;
    constructor(public payload: any) {}
}

export class CreateEmailSuccess implements Action {
    readonly type = CREATE_EMAIL_SUCCESS;
    constructor(public payload: EmailTemplate) {}
}

// update email
export const UPDATE_EMAIL = '[Emails] Update Email';
export const UPDATE_EMAIL_FAIL = '[Emails] Update Email Fail';
export const UPDATE_EMAIL_SUCCESS = '[Emails] Update Email Success';

export class UpdateEmail implements Action {
    readonly type = UPDATE_EMAIL;
    constructor(public payload: { id: string; data: EmailTemplate }) {}
}

export class UpdateEmailFail implements Action {
    readonly type = UPDATE_EMAIL_FAIL;
    constructor(public payload: any) {}
}

export class UpdateEmailSuccess implements Action {
    readonly type = UPDATE_EMAIL_SUCCESS;
    constructor(public payload: EmailTemplate) {}
}

// bulk delete emails
export const BULK_DELETE_EMAILS = '[Emails] Bulk Delete Emails';
export const BULK_DELETE_EMAILS_FAIL = '[Emails] Bulk Delete Emails Fail';
export const BULK_DELETE_EMAILS_SUCCESS = '[Emails] Bulk Delete Emails Success';

export class BulkDeleteEmails implements Action {
    readonly type = BULK_DELETE_EMAILS;
    constructor(public payload: string[]) {}
}

export class BulkDeleteEmailsFail implements Action {
    readonly type = BULK_DELETE_EMAILS_FAIL;
    constructor(public payload: any) {}
}

export class BulkDeleteEmailsSuccess implements Action {
    readonly type = BULK_DELETE_EMAILS_SUCCESS;
    constructor(public payload: string[]) {}
}

export type EmailsAction =
    | LoadEmails
    | LoadEmailsFail
    | LoadEmailsSuccess
    | CreateEmail
    | CreateEmailFail
    | CreateEmailSuccess
    | UpdateEmail
    | UpdateEmailFail
    | UpdateEmailSuccess
    | BulkDeleteEmails
    | BulkDeleteEmailsFail
    | BulkDeleteEmailsSuccess;
