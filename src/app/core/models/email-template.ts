export class EmailTemplate {
    id?: string;
    title: string;
    subject: string;
    from: string;
    delayed: any;
    content: string;
    mandatory: boolean;
    created_at: number;
    updated_at: number;
    last_send?: number;
    selected?: boolean;
}
