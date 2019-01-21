import { AfterViewInit, Component, OnInit } from '@angular/core';

import { JobService } from '../../../services/job.service';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, AfterViewInit {
    candidates;
    filterCandidates = [];
    contentLoading = false;
    lastCandidate = {
        first_name: '',
        last_name: ''
    };
    list;
    candidatesCompleted = false;
    selectedAll = false;
    amountCandidates;
    selectedItems = 0;
    filter = [];

    constructor(private jobService: JobService) {}

    ngOnInit() {
        this.contentLoading = true;
        this.jobService.getCandidatesChunk('first', 100).subscribe((candidates) => {
            this.candidates = candidates || [];
            this.filterCandidates = this.candidates;
            this.contentLoading = false;
            this.lastCandidate = {
                first_name: this.candidates[this.candidates.length - 1].first_name,
                last_name: this.candidates[this.candidates.length - 1].last_name
            };
            // console.log(this.candidates, this.lastCandidate.first_name);
            // console.log(this.lastCandidate.first_name);
            this.jobService.getCandidatesAmount().subscribe((amount: number) => {
                this.amountCandidates = amount;
            });
        });
    }

    getCandidatesChunk() {
        this.jobService.getCandidatesChunk(this.lastCandidate.first_name, 100).subscribe((candidates: any) => {
            // console.log('ssss', candidates.length, this.lastCandidate.first_name);
            if (candidates.length === 0) {
                this.candidatesCompleted = true;
            }
            candidates.forEach((item) => {
                if (this.selectedAll) {
                    item.checked = true;
                }
                this.candidates.push(item);
            });
            this.lastCandidate = {
                first_name: this.candidates[this.candidates.length - 1].first_name,
                last_name: this.candidates[this.candidates.length - 1].last_name
            };
            // console.log(this.candidates);
        });
    }

    onScroll() {
        setTimeout(() => {
            this.getCandidatesChunk();
        }, 1000);
    }

    ngAfterViewInit() {}

    onItemsBulkRemove() {}

    onItemClick(event, item) {}

    onItemSeletectedChange($event: Event, index: number) {
        this.candidates[index].checked = this.candidates[index].checked ? true : false;
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.candidates.forEach((item) => {
                item.checked = true;
            });
        } else {
            this.candidates.forEach((item) => {
                item.checked = false;
            });
        }
    }

    onFilterChanges(value) {
        console.log('onFilterChanges', value);
        this.filter = value;
    }
}
