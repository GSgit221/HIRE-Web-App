import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UtilitiesService } from './../../../../../core/services/utilities.service';

import { UserService } from '../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import * as fromStore from './../../../../../store';
import * as fromUsersActions from './../../../../../store/actions/users.action';
import * as fromSelectors from './../../../../../store/selectors';

import { CandidateService, JobService } from '@app/core/services';

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
    settingsOpened = false;
    showMenu: boolean = false;
    showTakeover: boolean = false;
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('myDropdown') menu: ElementRef;
    baseUrl: string;
    constructor(
        private store: Store<fromStore.State>,
        private renderer: Renderer2,
        private utilities: UtilitiesService,
        private jobService: JobService,
        private candidateService: CandidateService,
        private router: Router
    ) {
        this.baseUrl = `/tenant/${this.utilities.getTenant()}/hire`;
        this.store.dispatch(new fromUsersActions.LoadUsers());
    }

    ngOnInit() {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target !== this.toggleButton.nativeElement) {
                this.showMenu = false;
            }
        });
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

    onToggleDropdown() {
        this.showMenu = !this.showMenu;
    }

    onSearch(e) {
        console.log(this.router.url);
        this.candidateService.setSearchValueForCandidates(e.target.value);
        // this.jobService.setSearchValueForJobs(e.target.value);
    }
}
