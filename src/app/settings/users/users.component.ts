import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    contentLoading = false;
    user: User;
    userList = [];
    usersDetailForm: FormGroup;
    accountTypeOptions: SelectItem[];
    selectedItems = 0;
    selectedAll = false;

    activeSection = 'users';
    sections = ['users', 'pending-invitation'];

    constructor(private fb: FormBuilder,) {
    }

    ngOnInit() {
        this.userList = [
            {
                first_name: 'Greg',
                last_name: 'Kockott',
                email: 'greg@hellocrowd.net',
                accountType: 'Account Owner',
                invitationSent: 'May 13, 2018 13:50'
            },
            {
                first_name: 'Andrew',
                last_name: 'Jackson',
                email: 'andrew@hellocrowd.net',
                accountType: 'Admin',
                invitationSent: ''
            },
            {
                first_name: 'Andrew',
                last_name: 'Jackson',
                email: 'andrew@hellocrowd.net',
                accountType: 'User',
                invitationSent: ''
            },
        ];
        this.accountTypeOptions = [
            { label: 'Account Owner', value: 'account-owner' },
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
        ];
        this.usersDetailForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['' , [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            accountType: [''],
        });
        this.userList.forEach(userList => {
            userList.isVisible = false;
        });
    }

    onMouseOver(index) {
        this.userList[index].isVisible = true;
    }

    onMouseOut(index) {
        this.userList[index].isVisible = false;
    }

    onChangeSection(section: string) {
        this.activeSection = section;
    }

    private calculateSelectedUsers() {
        this.selectedItems = this.userList.filter(user => user.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    onItemSeletectedChange() {
        this.calculateSelectedUsers();
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.userList.forEach(user => user.selected = true);
        } else {
            this.userList.forEach(user => user.selected = false);
        }
        this.calculateSelectedUsers();
    }

    onAdd() {

    }
}
