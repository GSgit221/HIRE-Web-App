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
    selectedAll = false;
    amountCandidates;

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
            // console.log(this.candidates, this.lastCandidate.first_name);
            // console.log(this.lastCandidate.first_name);
            this.jobService.getCandidatesAmount().subscribe((amount: number) => {
                this.amountCandidates = amount;
            });
        });
        
    }
    download() {

        this.jobService.getCandidatesChunk(this.lastCandidate.first_name, 100).subscribe((candidates: any) => {
            // console.log('ssss', candidates.length, this.lastCandidate.first_name);
            if (candidates.length === 0) {
                this.finishDownLoadCandidates = true;
            }
            
            candidates.forEach((item, index) => {
                
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
    onItemSeletectedChange($event: Event, index: number) {
        if (this.candidates[index].checked) {
            this.candidates[index].checked = true;
        } else {
            this.candidates[index].checked = false;
        }
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
}
