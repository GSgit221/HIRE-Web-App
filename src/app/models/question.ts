export class Question {
    id: string;
    is_required: boolean;
    text: string;
    type: string;
    selected?: boolean;
    answers?: any[];
    review_time?: number;
    answer_time?: number;
    number_of_takes?: number;
    created_at?: number;
}
