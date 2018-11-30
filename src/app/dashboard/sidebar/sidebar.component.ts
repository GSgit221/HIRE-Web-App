import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from './../../models/user';
import { State } from './../../reducers';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    userSubscription: Subscription;
    user: User;
    users: User[];
    settingsOpened = true;

    constructor(private userService: UserService, private store: Store<State>) {
        this.userService.getUsers().subscribe((users: User[]) => {
            this.users = users;
        });
    }

    ngOnInit() {
        this.userSubscription = this.store.select('user').subscribe((user: User) => {
            this.user = user;
            console.log(this.user);
        });
    }

    onToggleOcItem(event) {
        event.preventDefault();
        console.log('clicked');
        this.settingsOpened = !this.settingsOpened;
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
