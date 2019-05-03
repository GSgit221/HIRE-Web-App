import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';

import { select, Store } from '@ngrx/store';
import { User } from '../../../core/models/user';
import { FormHelperService } from '../../../core/services/form-helper.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../modules/auth/auth.service';
import * as fromStore from './../../../store';
import * as fromActions from './../../../store/actions/users.action';
import * as fromSelectors from './../../../store/selectors';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    contentLoading = true;
    users: User[] = [];
    usersDetailForm: FormGroup;
    accountTypeOptions: SelectItem[];
    selectedItems = 0;
    selectedAll = false;
    msgs: Message[] = [];

    constructor(
        private fb: FormBuilder,
        public formHelper: FormHelperService,
        public userService: UserService,
        public authService: AuthService,
        private store: Store<fromStore.State>
    ) {}

    ngOnInit() {
        this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.contentLoading = false;
            this.users = users
                .slice(0)
                .map((u) => {
                    return { ...u, isVisible: false };
                })
                .filter((u) => {
                    return u.role && ['superadmin', 'admin', 'account_owner', 'recruiter'].indexOf(u.role) !== -1;
                })
                .sort((a, b) => (a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0));

            this.calculateSelectedUsers();
        });

        this.store.pipe(select(fromSelectors.getUsersError)).subscribe((error: any) => {
            this.contentLoading = false;
            if (error) {
                this.msgs.push({ severity: 'error', detail: error.error.error || 'Error' });
            } else {
                this.msgs = [];
            }
        });

        this.accountTypeOptions = [
            { label: 'Account Owner', value: 'account_owner' },
            { label: 'Admin', value: 'admin' },
            { label: 'Recruiter', value: 'recruiter' }
        ];

        this.usersDetailForm = this.fb.group({
            full_name: [
                '',
                [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]
            ],
            email: ['', [Validators.required, Validators.email]],
            accountType: ['', Validators.required]
        });
    }

    private calculateSelectedUsers() {
        this.selectedItems = this.users.filter((user) => user.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    onItemSeletectedChange() {
        event.stopPropagation();
        this.calculateSelectedUsers();
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.users.forEach((user) => {
                user.selected = true;
                user.isVisible = true;
            });
        } else {
            this.users.forEach((user) => (user.selected = false));
        }
        this.calculateSelectedUsers();
    }

    onUserBulkRemove() {
        this.contentLoading = true;
        const usersToRemove = this.users.filter((user) => user.selected).map((user) => user.id);
        this.store.dispatch(new fromActions.BulkDeleteUsers(usersToRemove));
    }

    onAddUserSubmit() {
        this.msgs = [];
        const form = this.usersDetailForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            return;
        }

        const fullName = form
            .get('full_name')
            .value.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        this.contentLoading = true;
        const data = {
            full_name: fullName,
            email: form.get('email').value,
            role: form.get('accountType').value
        };
        this.store.dispatch(new fromActions.CreateUser(data));
        this.usersDetailForm.reset();
    }

    onResendClick(event, userId: string) {
        event.preventDefault();
        event.stopPropagation();
        if (userId) {
            this.contentLoading = true;
            this.userService.resendInvitation(userId).subscribe(
                () => {
                    console.log('Invitation was sent');
                    this.contentLoading = false;
                },
                (response) => {
                    console.error(response);
                    this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                    this.contentLoading = false;
                }
            );
        }
    }
}
