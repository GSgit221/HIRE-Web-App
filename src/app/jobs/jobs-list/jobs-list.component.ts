import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    list = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.list = [
            {
                status: 'active',
                title: 'Senior System Engineer',
                location: 'Johannesburg, ZA',
                type: 'bag',
                applications: 165,
                created_at: '10d ago',
                last_application: 'Today',
                hiring_team: 1
            },
            {
                status: 'inactive',
                title: 'Graduate Recruit Program',
                location: 'Cape Town, ZA',
                type: 'refresh',
                applications: 327,
                created_at: '11m Ago',
                last_application: 'Yesterday',
                hiring_team: 1
            }
        ];
    }


    onAddClick(event) {
        event.preventDefault();
        this.router.navigate(['/dashboard/jobs/new']);
    }

}
