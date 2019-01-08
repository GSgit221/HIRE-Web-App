import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';

import { User } from '../../../models/user';
import { AuthService } from '../../../modules/auth/auth.service';
import { FormHelperService } from '../../../services/form-helper.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    contentLoading = false;
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
        public authService: AuthService
    ) {}

    ngOnInit() {
        this.contentLoading = true;
        this.userService.getUsers().subscribe((users: User[]) => {
            this.contentLoading = false;
            this.users = users || [];
            console.log(this.users);
            this.users.forEach((user) => {
                if (user.role === 'superadmin') {
                    user.role = 'Account Owner';
                } else if (user.role === 'admin') {
                    user.role = 'Admin';
                } else {
                    user.role = 'Recruiter';
                }
            });
        });
        this.accountTypeOptions = [
            { label: 'Account Owner', value: 'superadmin' },
            { label: 'Admin', value: 'admin' },
            { label: 'Recruiter', value: 'recruiter' }
        ];
        this.usersDetailForm = this.fb.group({
            full_name: [
                '',
                [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]
            ],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            accountType: ['', Validators.required]
        });
        this.users.forEach((users) => {
            users.isVisible = false;
        });
    }

    onMouseOver(index) {
        this.users[index].isVisible = true;
    }

    onMouseOut(index) {
        this.users[index].isVisible = this.users[index].selected ? true : false;
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
        this.userService.bulkDeleteUsers(usersToRemove).subscribe(() => {
            this.userService.getUsers().subscribe((users: User[]) => {
                this.users = users;
                this.contentLoading = false;
                this.calculateSelectedUsers();
                this.updateOrder();
            });
        });
    }

    updateOrder() {
        this.users = this.users.sort((a: any, b: any) => {
            if (a['first_name'] < b['first_name']) {
                return -1;
            } else if (a['first_name'] > b['first_name']) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    onAdd() {
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
        this.userService.create(data).subscribe(
            (response: User) => {
                console.log(response);
                this.contentLoading = false;
                this.users.push(response);
                this.updateOrder();
            },
            (error) => {
                console.log(error);
                this.msgs.push({ severity: 'error', detail: error.error.error || 'Error' });
                this.contentLoading = false;
            }
        );
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
