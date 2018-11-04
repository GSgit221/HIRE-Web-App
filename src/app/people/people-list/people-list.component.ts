import {Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {JobService} from '../../services/job.service';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, AfterViewInit {
    candidates;
    filterCandidates;
    contentLoading = false;
    list;
    showFilter = false;
    @ViewChild('scrollMe') myScrollContainer: ElementRef;

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        // console.log(event);
    }

    constructor(private jobService: JobService) {
    }

    ngOnInit() {
        this.jobService.getAllCandidates().subscribe((candidates) => {
            this.candidates = candidates || [];
            this.filterCandidates = this.candidates.slice(0, 20);
            this.contentLoading = false;
            console.log(candidates, this.filterCandidates);
        });
    }

    ngAfterViewInit() {
    }

    onShowFilter() {
        this.showFilter = !this.showFilter;
    }

    scrollToBottom(): void {
        console.log('scroll to bottom');
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

}
