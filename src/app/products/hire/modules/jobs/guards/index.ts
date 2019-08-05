import { CandidatesGuard } from './candidates.guard';
import { JobsGuard } from './jobs.guard';

export const guards: any[] = [JobsGuard, CandidatesGuard];
export * from './jobs.guard';
export * from './candidates.guard';
