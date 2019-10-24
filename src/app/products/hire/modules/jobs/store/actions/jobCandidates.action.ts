import { Action } from '@ngrx/store';
import { Candidate } from './../../../../../../core/models/candidate';

// Load Job Candidates
export const LOAD_JOB_CANDIDATES = '[Jobs] Load Job Candidates';
export const LOAD_JOB_CANDIDATES_FAIL = '[Jobs] Load Job Candidates Fail';
export const LOAD_JOB_CANDIDATES_SUCCESS = '[Jobs] Load Job Candidates Success';
export const DELETE_JOB_CANDIDATE = '[Jobs] Delete Job Candidate';
export const UPDATE_JOB_CANDIDATE = '[Jobs] Update Job Candidate';

export class LoadJobCandidates implements Action {
    readonly type = LOAD_JOB_CANDIDATES;
    constructor(public payload: string) {}
}

export class LoadJobCandidatesFail implements Action {
    readonly type = LOAD_JOB_CANDIDATES_FAIL;
    constructor(public payload: any) {}
}

export class LoadJobCandidatesSuccess implements Action {
    readonly type = LOAD_JOB_CANDIDATES_SUCCESS;
    constructor(public payload: { jobId: string; candidates: Candidate[] }) {}
}

export class DeleteJobCandidate implements Action {
    readonly type = DELETE_JOB_CANDIDATE;
    constructor(public payload: { jobId: string; candidateId: string }) {}
}

export class UpdateJobCandidate implements Action {
    readonly type = UPDATE_JOB_CANDIDATE;
    constructor(public payload: { jobId: string; candidateId: string; data: any }) {}
}
export type JobCandidatesAction =
    | LoadJobCandidates
    | LoadJobCandidatesFail
    | LoadJobCandidatesSuccess
    | DeleteJobCandidate
    | UpdateJobCandidate;
