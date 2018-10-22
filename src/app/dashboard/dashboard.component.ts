import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './../reducers/index';
import * as fromUserActions from './../actions/user/user.actions';

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
