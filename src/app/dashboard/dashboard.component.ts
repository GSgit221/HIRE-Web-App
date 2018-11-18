import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromUserActions from './../actions/user/user.actions';
import { State } from './../reducers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private store: Store<State>) {
        this.store.dispatch(new fromUserActions.GetAuthUser());
    }

    ngOnInit() {
        console.log('Dashboard');
    }
}
