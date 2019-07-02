import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from './../../../../../../core/models/user';
import { UserService } from './../../../../../../core/services/user.service';
import { UtilitiesService } from './../../../../../../core/services/utilities.service';
import { AuthService } from './../../../../../../modules/auth/auth.service';
import * as fromStore from './../../../../../../store';

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
    @Input('enable')
    set _enable(value: boolean) {
        this.showList = value;
    }
    constructor(
        private elRef: ElementRef,
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private utilities: UtilitiesService,
        private store: Store<fromStore.State>
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

            this.userService.takeover(email).subscribe((response: any) => {
                this.showList = false;
                this.authService.setSession(response);
                this.utilities.setTenant(response.tenant_id);
                this.router.navigateByUrl(`tenant/${response.tenant_id}/hire`);
                this.router
                    .navigateByUrl(`tenant/${response.tenant_id}/hire/people`, { skipLocationChange: true })
                    .then(() => {
                        this.store.dispatch(new fromStore.LoadUser());
                        this.router.navigateByUrl(`tenant/${response.tenant_id}/hire/jobs`);
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
