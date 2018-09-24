import { State, AppState } from './../../reducers/index';
import { User } from './../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUserActions from './../../actions/user/user.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    user$: Observable<Object>;
    userState: Observable<User>;
    settingsOpened = true;


    constructor(private userService: UserService, private store: Store<AppState>) { }

    ngOnInit() {

        // TEMPORARY
        this.store.dispatch(new fromUserActions.GetAuthUser());
        this.userState = this.store.select('user');
        this.userState.subscribe((user: User) => {
            console.log('From store', user);
        });


        this.user$ = this.userService.me().pipe(map((user: User) => {
            user.initials = user.first_name.charAt(0).toUpperCase();
            if (user.last_name) {
                user.initials += user.last_name.charAt(0).toUpperCase();
            }
            return user;
        }));
    }

    onToggleOcItem(event) {
        event.preventDefault();
        console.log('clicked');
        this.settingsOpened = !this.settingsOpened;
    }

}
