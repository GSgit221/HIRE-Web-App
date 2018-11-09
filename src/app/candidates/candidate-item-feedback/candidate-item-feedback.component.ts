import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-candidate-item-feedback',
    templateUrl: './candidate-item-feedback.component.html',
    styleUrls: ['./candidate-item-feedback.component.scss']
})
export class CandidateItemFeedbackComponent implements OnInit {
    abilities: any[] = [{ title: 'Culture Fit' },{ title: 'Java Skills'}];
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

    constructor() {
    }

    ngOnInit() {

    }

    moveUp(index: number) {
        const currentAbilities = this.abilities[index];
        this.abilities.splice(index, 1);
        this.abilities.splice(index - 1, 0, currentAbilities);
    }

    moveDown(index: number) {
        const currentAbilities = this.abilities[index];
        this.abilities.splice(index, 1);
        this.abilities.splice(index + 1, 0, currentAbilities);
    }

    removeAbility(index: number) {
        if (index === 0) {
            this.abilities.shift();
            return false;
        }
        this.abilities.splice(index, 1);
        console.log(this.abilities);
    }
    onEvaluateAbility(index: number, mark) {
        this.abilities[index].checked = mark;
        console.log(this.abilities);
    }

    addAbilities(input) {
        console.log(input.value);
        if (input.value.trim() !== '') {
            this.abilities.push({ title: input.value });
            input.value = '';
        }
    }

    openEdit() {
        this.addPosition = true;
    }

    saveAbilities(input) {
        console.log(input);
        // if (input.value.trim() !== '') {
        //     this.abilities.push({ title: input.value });
        //     input.value = '';
        // }
        this.addPosition = false;
    }
    saveResults() {
        this.view = 'results';
    }
    onEdit() {
        this.addPosition = false;
        this.view = 'default';
        this.editMarks = true;
    }


}
