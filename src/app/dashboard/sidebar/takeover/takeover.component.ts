import { State } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import * as fromUserActions from './../../../actions/user/user.actions';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/auth.service';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../models/user';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

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
                u.full_str = `${u.email} ${u.first_name} ${u.last_name}`;
                return u;
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
        private store: Store<State>) {
    }

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
        if (searchStr.length > 2) {
            this._filteredUsers = this._users.filter(u => u.full_str.toLowerCase().indexOf(searchStr) !== -1);
        } else {
            this._filteredUsers = [];
        }
        if (event.keyCode === 13 && this.form.valid) {
            this._filteredUsers = [];
            const email = this.form.value.search;
            console.log('Takeover', email);

            this.userService.takeover(email)
                .subscribe(response => {
                    this.authService.setSession(response);
                    this.showList = false;
                    this.router.navigateByUrl('/dashboard/people', { skipLocationChange: true }).then(() => {
                        this.store.dispatch(new fromUserActions.GetAuthUser());
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
