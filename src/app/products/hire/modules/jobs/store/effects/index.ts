import { JobCandidatesEffect } from './jobCandidates.effect';
import { JobsEffect } from './jobs.effect';

export const effects: any[] = [JobsEffect, JobCandidatesEffect];

export * from './jobs.effect';
export * from './jobCandidates.effect';
