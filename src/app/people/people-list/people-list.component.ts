import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, AfterViewInit {
    candidates;
    lengthCandidates;
    filterCandidates = [];
    contentLoading = false;
    lastCandidate = {
        first_name: '',
        last_name: ''
    };

    list;
    showFilter = false;
    finishDownLoadCandidates = false;

    constructor(private jobService: JobService) {
    }
    ngOnInit() {
        this.contentLoading = true;
        this.jobService.getCandidatesChunk('first', 100).subscribe((candidates) => {
            this.candidates = candidates || [];
            this.lengthCandidates = this.formatWithComa(this.candidates.length);
            this.filterCandidates = this.candidates;
            this.contentLoading = false;
            this.lastCandidate = {
                first_name: this.candidates[this.candidates.length - 1].first_name,
                last_name: this.candidates[this.candidates.length - 1].last_name
            };
            // console.log(this.candidates);
            // console.log(this.lastCandidate.first_name);
        });
    }
    download() {
        this.jobService.getCandidatesChunk(this.lastCandidate.first_name, 100).subscribe((candidates: any) => {
            // console.log('ssss', candidates.length, candidates);
            if (candidates.length === 0) {
                this.finishDownLoadCandidates = true;
            }
            setTimeout(() => {
                candidates.forEach((item) => {
                    this.candidates.push(item);
                });
                this.lastCandidate = {
                    first_name: this.candidates[this.candidates.length - 1].first_name,
                    last_name: this.candidates[this.candidates.length - 1].last_name
                };

            }, 0);
            // console.log(this.lastCandidate.first_name);
        });
    }
    onScroll() {
        // console.log('scrolled!!');
        this.download();
    }


    ngAfterViewInit() {
    }

    onShowFilter() {
        this.showFilter = !this.showFilter;
    }
    formatWithComa(num) {
        return ('' + num).replace(
            /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
            function (m, s1, s2) {
                return s2 || (s1 + ',');
            }
        );
    }
    onItemsBulkRemove() {

    }
    onItemClick(event, item) {

    }
    onItemSeletectedChange() {

    }
    onSelectAllChange() {

    }
}
