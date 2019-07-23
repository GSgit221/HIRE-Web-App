export class EmailTemplate {
    id?: string;
    type: string;
    title: string;
    subject: string;
    from: string;
    delayed: any;
    content: string;
    email_content: string;
    link: number;
    mandatory: boolean;
    created_at: number;
    updated_at: number;
    last_send?: number;
    selected?: boolean;
    hasSMS?: boolean;
    messageContent?: string;
}
