import {Component, OnInit, Input} from '@angular/core';
import { JobService } from '../../services/job.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { User } from '../../models/user';

@Component({
    selector: 'app-candidate-item-feedback',
    templateUrl: './candidate-item-feedback.component.html',
    styleUrls: ['./candidate-item-feedback.component.scss']
})
export class CandidateItemFeedbackComponent implements OnInit {
    @Input() jobId;
    @Input() candidateId;
    @Input() feedback;
    feedbackForm: FormGroup;

    abilities: any[] = [];
    addPosition = false;
    editMarks = false;
    view = 'default';
    candidateAbilities = [
        {
            id: 1,
            avatar: '/assets/images/placeholders/1.png',
            first_name: 'Greg',
            last_name: 'Kockott',
            overall_rating: 3,
            abilities_rating: [
                {
                    name: 'Overall Culture Fit',
                    rate: 2
                },
                {
                    name: 'Java Skills',
                    rate: 2
                },
                {
                    name: 'Leadership Ability',
                    rate: 1
                },
                {
                    name: 'Self Motivated',
                    rate: 3
                }
            ],
            comment: 'He’s got a real flare for technology and I feel would make a great addition to our organisation.'
        },
        {
            id: 2,
            avatar: '/assets/images/placeholders/1.png',
            first_name: 'Nick',
            last_name: 'Romanenko',
            overall_rating: 3,
            abilities_rating: [
                {
                    name: 'Overall Culture Fit',
                    rate: 3
                },
                {
                    name: 'Java Skills',
                    rate: 1
                },
                {
                    name: 'Leadership Ability',
                    rate: 2
                },
                {
                    name: 'Self Motivated',
                    rate: 1
                }
            ],
            comment: '2He’s got a real flare for technology and I feel would make a great addition to our organisation.'
        },
        {
            id: 3,
            avatar: '',
            first_name: 'Sasha',
            last_name: 'Bondar',
            overall_rating: 4,
            abilities_rating: [
                {
                    name: 'Overall Culture Fit',
                    rate: 2
                },
                {
                    name: 'Java Skills',
                    rate: 2
                },
                {
                    name: 'Leadership Ability',
                    rate: 1
                },
                {
                    name: 'Self Motivated',
                    rate: 3
                }
            ],
            comment: '3He’s got a real flare for technology and I feel would make a great addition to our organisation.'
        }
    ];

    constructor(private jobService: JobService, private fb: FormBuilder, private store: Store<State>) {
    }

    ngOnInit() {
        this.initForm();
        console.log(this.jobId, this.candidateId);
        console.log(this.feedback);
        if (this.feedback) {
            this.store.select('user').subscribe((user: User) => {
                this.feedback[this.jobId].comments.forEach(item => {
                    if (item.user_id === user.id) {
                        console.log('bingo');
                        this.feedbackForm.patchValue({
                            comments: item.value
                        });
                    }
                });
                this.feedback[this.jobId].rating.forEach(item => {
                    if (item.user_id === user.id) {
                        console.log('bingo 2', item.value);
                        this.feedbackForm.patchValue({
                            rating: this.transformRatingToPercent(item.value)
                        });
                    }
                });
                this.abilities = this.feedback[this.jobId].position_rating;
                this.feedback[this.jobId].position_rating.forEach((item, index) => {
                    console.log(item);
                    this.abilities[index].order = item.order;
                    item.votes.forEach(itemVotes => {
                        if (itemVotes.user_id === user.id) {
                            this.abilities[index].value = itemVotes.value;
                        }
                    });
                    // if (item.user_id === user.id) {
                    //     console.log('bingo 3', item.value);
                    //     // this.feedbackForm.patchValue({
                    //     //     rating: this.transformRatingToPercent(item.value)
                    //     // });
                    // }
                });
            });
        }
        
        console.log(this.abilities);
    }
    initForm() {
        this.feedbackForm = this.fb.group({
            comments: ['', Validators.required],
            rating: ['0', Validators.required],
            positionRating: ['']
        });
    }

    moveUp(index: number) {
        console.log(this.abilities);
        this.abilities[index].order = index - 1;
        this.abilities[index - 1].order = index;
        // const currentAbilities = this.abilities[index];
        // this.abilities.splice(index, 1);
        // this.abilities.splice(index - 1, 0, currentAbilities);
        this.updateOrder();
    }

    moveDown(index: number) {
        // const currentAbilities = this.abilities[index];
        // this.abilities.splice(index, 1);
        // this.abilities.splice(index + 1, 0, currentAbilities);
        this.abilities[index].order = index + 1;
        this.abilities[index + 1].order = index;
        this.updateOrder();
    }

    removeAbility(index: number) {
        if (index === 0) {
            this.abilities.shift();
            return false;
        }
        this.abilities.splice(index, 1);
        this.updateOrder();
        console.log(this.abilities);
    }
    onEvaluateAbility(index: number, mark) {
        this.abilities[index].value = mark;
        console.log(this.abilities);
    }

    addAbilities(input) {
        if (input.value.trim() !== '') {
            this.abilities.push({ title: input.value, id: this.makeid(), order: this.abilities.length });
            input.value = '';
        }
        console.log(this.abilities);
    }
    updateOrder() {
        // this.abilities.forEach((item, index) => {
        //     item.order = index;
        // });
        this.abilities.sort((a: any, b: any) => {
            if (a['order'] < b['order']) {
                return -1;
            } else if (a['order'] > b['order']) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    openEdit() {
        this.addPosition = true;
    }

    saveAbilities(input) {
        console.log(input);
        this.addAbilities(input);
        this.addPosition = false;
        this.updateOrder();
        console.log(this.abilities);
    }
    saveResults() {
        this.view = 'results';
        this.feedbackForm.patchValue({
            positionRating: this.abilities,
            rating: this.transformRating(this.feedbackForm.value.rating)
        });
        console.log(this.feedbackForm.value.positionRating);
        this.jobService.saveCandidateFeedback(this.jobId, this.candidateId, this.feedbackForm.value).subscribe((data) => {
            console.log(data);
        });
    }
    transformRating(value: number) {
        console.log(value);
        switch (value) {
            case 0:
                return 1;
            case 25:
                return 2;
            case 50:
                return 3;
            case 75:
                return 4;
            case 100:
                return 5;
            default:
                return 1;
        }
    }
    transformRatingToPercent(value: number) {
        console.log(value);
        switch (value) {
            case 1:
                return 0;
            case 2:
                return 25;
            case 3:
                return 50;
            case 4:
                return 75;
            case 5:
                return 100;
            default:
                return 0;
        }
    }
    onEdit() {
        this.addPosition = false;
        this.view = 'default';
        this.editMarks = true;
    }
    makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }


}
