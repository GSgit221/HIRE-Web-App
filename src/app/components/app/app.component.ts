import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './../../modules/auth/auth.service';
import * as fromStore from './../../store';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private authService: AuthService, private store: Store<fromStore.State>) {
        if (authService.isLoggedIn()) {
            this.store.dispatch(new fromStore.LoadUser());
        }
    }
}
