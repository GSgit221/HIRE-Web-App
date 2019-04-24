import { Component, OnInit } from '@angular/core';
import { RecruiterService } from './../../../../services/recruiter.service';

@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
    constructor(private recruiterService: RecruiterService) {
        this.recruiterService.getOnboarding().subscribe((response) => console.log('LOADED', response));
    }

    ngOnInit() {}
}
