import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
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

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        // console.log(event);
    }

    constructor(private jobService: JobService) {
    }

    ngOnInit() {
        this.contentLoading = true;
        this.jobService.getCandidatesChunk('first', 80).subscribe((candidates) => {
            this.candidates = candidates || [];	            this.candidates = candidates || [];
            this.lengthCandidates = this.formatWithComa(this.candidates.length);	            this.lengthCandidates = this.formatWithComa(this.candidates.length);
            this.filterCandidates = this.candidates.slice(0, 20);	            this.filterCandidates = this.candidates;
            this.contentLoading = false;	            this.contentLoading = false;
            this.lastCandidate = this.candidates[this.candidates.length - 1].first_name;
        });
    }
    download() {
        this.jobService.getCandidatesChunk(this.lastCandidate, 80).subscribe((candidates: any) => {
            candidates.forEach((item) => {
                this.candidates.push(item);
            });
            this.lastCandidate = {
                first_name: this.candidates[this.candidates.length - 1].first_name,
                last_name: this.candidates[this.candidates.length - 1].last_name
            };
        });
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
    // scrollToBottom(): void {
    //     console.log('scroll to bottom');
    //     try {
    //         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    //     } catch (err) {
    //     }
    // }

}
