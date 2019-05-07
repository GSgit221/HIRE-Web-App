import { Component, OnInit } from '@angular/core';

import { User } from './../../core/models/user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: User;
    constructor() {}
    ngOnInit() {}
}
