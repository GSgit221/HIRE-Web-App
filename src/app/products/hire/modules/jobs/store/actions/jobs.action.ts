import { Action } from '@ngrx/store';
import { Job } from './../../../../../../core/models/job';

// load jobs
export const LOAD_JOBS = '[Jobs] Load Jobs';
export const LOAD_JOBS_FAIL = '[Jobs] Load Jobs Fail';
export const LOAD_JOBS_SUCCESS = '[Jobs] Load Jobs Success';

export class LoadJobs implements Action {
    readonly type = LOAD_JOBS;
}

export class LoadJobsFail implements Action {
    readonly type = LOAD_JOBS_FAIL;
    constructor(public payload: any) {}
}

export class LoadJobsSuccess implements Action {
    readonly type = LOAD_JOBS_SUCCESS;
    constructor(public payload: Job[]) {}
}

// create job
export const CREATE_JOB = '[Jobs] Create Job';
export const CREATE_JOB_FAIL = '[Jobs] Create Job Fail';
export const CREATE_JOB_SUCCESS = '[Jobs] Create Job Success';

export class CreateJob implements Action {
    readonly type = CREATE_JOB;
    constructor(public payload: Job) {}
}

export class CreateJobFail implements Action {
    readonly type = CREATE_JOB_FAIL;
    constructor(public payload: any) {}
}

export class CreateJobSuccess implements Action {
    readonly type = CREATE_JOB_SUCCESS;
    constructor(public payload: Job) {}
}

// update job
export const UPDATE_JOB = '[Jobs] Update Job';
export const UPDATE_JOB_FAIL = '[Jobs] Update Job Fail';
export const UPDATE_JOB_SUCCESS = '[Jobs] Update Job Success';

export class UpdateJob implements Action {
    readonly type = UPDATE_JOB;
    constructor(public payload: { id: string; data: Job }) {}
}

export class UpdateJobFail implements Action {
    readonly type = UPDATE_JOB_FAIL;
    constructor(public payload: any) {}
}

export class UpdateJobSuccess implements Action {
    readonly type = UPDATE_JOB_SUCCESS;
    constructor(public payload: Job) {}
}

// bulk delete jobs
export const BULK_DELETE_JOBS = '[Jobs] Bulk Delete Jobs';
export const BULK_DELETE_JOBS_FAIL = '[Jobs] Bulk Delete Jobs Fail';
export const BULK_DELETE_JOBS_SUCCESS = '[Jobs] Bulk Delete Jobs Success';

export class BulkDeleteJobs implements Action {
    readonly type = BULK_DELETE_JOBS;
    constructor(public payload: string[]) {}
}

export class BulkDeleteJobsFail implements Action {
    readonly type = BULK_DELETE_JOBS_FAIL;
    constructor(public payload: any) {}
}

export class BulkDeleteJobsSuccess implements Action {
    readonly type = BULK_DELETE_JOBS_SUCCESS;
    constructor(public payload: string[]) {}
}

export type JobsAction =
    | LoadJobs
    | LoadJobsFail
    | LoadJobsSuccess
    | CreateJob
    | CreateJobFail
    | CreateJobSuccess
    | UpdateJob
    | UpdateJobFail
    | UpdateJobSuccess
    | BulkDeleteJobs
    | BulkDeleteJobsFail
    | BulkDeleteJobsSuccess;
