import { CandidateService } from './candidate.service';
import { EmailService } from './email.service';
import { FormHelperService } from './form-helper.service';
import { JobService } from './job.service';
import { QuestionnaireService } from './questionnaire.service';
import { UserService } from './user.service';
import { UtilitiesService } from './utilities.service';

export const services: any[] = [
    UserService,
    JobService,
    CandidateService,
    UtilitiesService,
    QuestionnaireService,
    FormHelperService,
    EmailService
];

export * from './questionnaire.service';
export * from './candidate.service';
export * from './candidate.service';
export * from './job.service';
export * from './user.service';
export * from './utilities.service';
export * from './email.service';
