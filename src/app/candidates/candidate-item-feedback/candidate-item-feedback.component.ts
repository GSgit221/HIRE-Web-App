import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-candidate-item-feedback',
    templateUrl: './candidate-item-feedback.component.html',
    styleUrls: ['./candidate-item-feedback.component.scss']
})
export class CandidateItemFeedbackComponent implements OnInit {
    abilities = ['Culture Fit'];
    editView = false;

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

    addAbilities(input) {
        console.log(input.value);
        if (input.value.trim() !== '') {
            this.abilities.push(input.value);
            input.value = '';
        }
    }

    openEdit() {
        this.editView = true;
    }

    saveAbilities() {
        this.editView = false;
    }
    saveResults() {

    }


}
