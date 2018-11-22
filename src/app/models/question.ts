export class Question {
    id: string;
    is_required: boolean;
    text: string;
    type: string;
    selected?: boolean;
    answers?: any[];
}
