import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/services/user.service';
import { User } from './../../../core/models/user';
import * as fromStore from './../../../store';
import * as fromUsersActions from './../../../store/actions/users.action';
import * as fromSelectors from './../../../store/selectors';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    userSubscription: Subscription;
    usersSubscription: Subscription;
    user: User;
    users: User[];
    settingsOpened = true;

    constructor(private userService: UserService, private store: Store<fromStore.State>) {
        this.store.dispatch(new fromUsersActions.LoadUsers());
    }

    ngOnInit() {
        this.userSubscription = this.store.pipe(select(fromSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = user;
            if (this.user) {
                console.log('🎩', this.user);
            }
        });
        this.usersSubscription = this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.users = [...users];
            if (this.users && this.users.length) {
                console.log('🎩 ALL:', this.users);
            }
        });
    }

    onToggleOcItem(event) {
        event.preventDefault();
        this.settingsOpened = !this.settingsOpened;
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }
    }
}
