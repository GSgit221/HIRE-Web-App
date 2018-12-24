export class Stage {
    id: string;
    title: string;
    resume_matching_threshold?: number;
    automatically_progress_matching_threshold?: boolean;
    integration: string;
    acceptance_criteria: number;
    automatically_progress_meeting_criteria: boolean;
    order?: number;
}
