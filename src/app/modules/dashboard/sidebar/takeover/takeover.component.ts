import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from './../../../../models/user';
import { AuthService } from './../../../../modules/auth/auth.service';
import { UserService } from './../../../../services/user.service';
import { UtilitiesService } from './../../../../services/utilities.service';

@Component({
    selector: 'app-takeover',
    templateUrl: './takeover.component.html',
    styleUrls: ['./takeover.component.scss']
})
export class TakeoverComponent implements OnInit {
    @ViewChild('inputRef') inputRef: ElementRef;
    _users: User[] = [];
    _filteredUsers: User[] = [];
    form: FormGroup;
    @Input()
    set users(users: User[]) {
        if (users) {
            this._users = users.map((u: User) => {
                const obj = { ...u };
                obj.full_str = `${u.email} ${u.first_name} ${u.last_name}`;
                return obj;
            });
        } else {
            this._users = null;
        }
    }
    showList = false;

    constructor(
        private elRef: ElementRef,
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private utilities: UtilitiesService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            search: ['', Validators.email]
        });
    }

    onToggle(event) {
        event.preventDefault();
        this.showList = !this.showList;
    }

    onKeyup(event) {
        const searchStr = this.form.value.search.toLowerCase();
        this._filteredUsers =
            searchStr.length > 2 ? this._users.filter((u) => u.full_str.toLowerCase().indexOf(searchStr) !== -1) : [];
        if (event.keyCode === 13 && this.form.valid) {
            this._filteredUsers = [];
            const email = this.form.value.search;
            console.log('Takeover', email);

            this.userService.takeover(email).subscribe((response) => {
                this.authService.setSession(response);
                this.showList = false;
                this.router.navigateByUrl('/dashboard/people', { skipLocationChange: true }).then(() => {
                    // this.store.dispatch(new fromUserActions.GetAuthUser());
                    this.router.navigateByUrl('/dashboard/jobs');
                });
            });
        }
    }

    onSelectUser(user) {
        this.form.patchValue({ search: user.email });
        this._filteredUsers = [];
        this.inputRef.nativeElement.focus();
    }
}
