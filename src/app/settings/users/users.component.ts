import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Message, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FormHelperService } from '../../services/form-helper.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    contentLoading = false;
    users = [];
    usersDetailForm: FormGroup;
    accountTypeOptions: SelectItem[];
    selectedItems = 0;
    selectedAll = false;
    msgs: Message[] = [];
    status = ['Active', 'Pending', 'Disabled'];

    constructor(
    private fb: FormBuilder,
    public formHelper: FormHelperService,
    public userService: UserService,
    public authService:AuthService,
    ) {}

    ngOnInit() {
        this.contentLoading = true;
        this.userService.getUsers().subscribe((users: User[]) => {
            this.contentLoading = false;
            this.users = users || [];
             console.log(this.users);
        });
        this.accountTypeOptions = [
            { label: 'Account Owner', value: 'account-owner' },
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
        ];
        this.usersDetailForm = this.fb.group({
            full_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]],
            email: ['' , [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            accountType: [''],
        });
        this.users.forEach(users => {
            users.isVisible = false;
        });
    }

    onMouseOver(index) {
        this.users[index].isVisible = true;
    }

    onMouseOut(index) {
        if( this.users[index].selected) {
            this.users[index].isVisible = true;
        }else {
            this.users[index].isVisible = false;
        }
    }

    private calculateSelectedUsers() {
        this.selectedItems = this.users.filter(user => user.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    onItemSeletectedChange() {
        event.stopPropagation();
        this.calculateSelectedUsers();
    }

    onSelectedRow(index) {
         this.users[index].selected = !this.users[index].selected;
         this.users[index].isVisible = true;
         this.calculateSelectedUsers();
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.users.forEach(user => {
                user.selected = true;
                user.isVisible = true;
            });
        } else {
            this.users.forEach(user => user.selected = false);
        }
        this.calculateSelectedUsers();
    }

    onAdd() {
        debugger
        this.msgs = [];
        const form = this.usersDetailForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            return;
        }
        this.contentLoading = true;
        let data = {
            full_name: form.get('full_name').value,
            email: form.get('email').value
        }
        debugger
        this.userService.create(data)
            .subscribe((response: User) => {
                console.log(response)
                this.contentLoading = false;
                this.users.push(response);
                this.usersDetailForm.reset();
            }, error => {
                console.log(error);
                this.msgs.push({severity: 'error', detail: error.error.error || 'Error'});
                this.contentLoading = false;
            });
    }

}
