import { State } from './../../reducers/index';
import { User } from './../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUserActions from './../../actions/user/user.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    userSubscription: Subscription;
    user: User;
    settingsOpened = true;


    constructor(private userService: UserService, private store: Store<State>) { }

    ngOnInit() {
        this.userSubscription = this.store.select('user').subscribe((user: User) => this.user = user);
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
