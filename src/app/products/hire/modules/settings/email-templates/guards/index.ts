import { EmailExistsGuard } from './email-exist.guard';
import { EmailsGuard } from './emails.guard';

export const guards: any[] = [EmailsGuard, EmailExistsGuard];
export * from './emails.guard';
export * from './email-exist.guard';
