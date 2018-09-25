import { State } from './reducers/index';
import { Store } from '@ngrx/store';
import { Component, ViewEncapsulation } from '@angular/core';
import * as fromUserActions from './actions/user/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private store: Store<State>) {
        this.store.dispatch(new fromUserActions.GetAuthUser());
    }
}
