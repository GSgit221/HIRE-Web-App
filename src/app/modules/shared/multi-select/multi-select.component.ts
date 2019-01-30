import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormHelperService } from './../../../services/form-helper.service';

import { User } from '../../../models/user';
import { UserService } from './../../../services/user.service';
import * as fromStore from './../../../store';
import * as fromActions from './../../../store/actions/users.action';
import * as fromSelectors from './../../../store/selectors';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
    menuIsVisible = false;
    newItemMode = false;
    selectedValue = [];
    selectedItems = [];
    contentLoading = false;
    newUserForm: FormGroup;
    _items: any[] = [];
    @Input() inviteUsers: boolean;
    @Input() userType: string;

    constructor(
        private elRef: ElementRef,
        private fb: FormBuilder,
        private userService: UserService,
        private formHelper: FormHelperService,
        private store: Store<fromStore.State>
    ) {
        this.newUserForm = this.fb.group({
            full_name: [
                '',
                [Validators.required, Validators.minLength(2), Validators.pattern('\\b\\w+\\b(?:.*?\\b\\w+\\b){1}')]
            ],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // Click outside of drop-down
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.elRef.nativeElement.children[0].contains(event.target)) {
            this.menuIsVisible = false;
        }
    }

    ngOnInit() {
        this.store.pipe(select(fromSelectors.getUsersLoading)).subscribe((loading: boolean) => {
            this.contentLoading = loading;
        });
        this.store.pipe(select(fromSelectors.getUsersEntities)).subscribe((users: User[]) => {
            this.selectedItems = [];
            if (this._items.length && this._items.length !== users.length) {
                this.newItemMode = false;
                const existingIds = this._items.map((u) => u.id);
                const newItems = users.filter((u) => existingIds.indexOf(u.id) === -1);
                this.newUserForm.reset();

                newItems.forEach((user) => {
                    const u = { ...user };
                    if (!this._items.find((userItem) => userItem.id === u.id) && u.role && this.userType === u.role) {
                        u.selected = true;
                        this._items.push(u);
                        this.selectedItems.push(u);
                    }
                });
            } else {
                users.forEach((user) => {
                    const u = { ...user };
                    if (!this._items.find((userItem) => userItem.id === u.id) && u.role && this.userType === u.role) {
                        this._items.push(u);
                    }
                });
            }

            this.setSelected();
        });
    }

    private setSelected() {
        if (this.selectedValue && this.selectedValue.length) {
            this.selectedValue.forEach((sv) => {
                const item = this._items.find((_item) => _item.id === sv);
                if (item) {
                    item.selected = true;
                    this.selectedItems.push(item);
                }
            });
        }
    }

    writeValue(value: any) {
        if (value !== undefined) {
            // console.log('VALUE PASSED TO COMPONENT:', value);
            this.selectedValue = value;
            this.setSelected();
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    onMenuToggle() {
        this.menuIsVisible = !this.menuIsVisible;
    }

    onSelectItem(item) {
        item.selected = true;
        this.selectedItems.push(item);
        this.menuIsVisible = false;

        this.selectedValue = this.selectedItems.map((si) => si.id);
        this.propagateChange(this.selectedValue);
    }
    onAddNewClick() {
        this.menuIsVisible = false;
        this.newItemMode = true;
    }

    onAddNewItem(event) {
        event.preventDefault();
        const form = this.newUserForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            return;
        }
        this.contentLoading = true;
        const data = form.value;
        data.role = 'user';
        this.store.dispatch(new fromActions.CreateUser(data));
    }

    onCancelAddNewItem() {
        event.preventDefault();
        this.newItemMode = false;
    }

    onRemoveFromSelected(item) {
        this.selectedItems = this.selectedItems.filter((si) => si.id !== item.id);
        const menuItem = this._items.find((mi) => mi.id === item.id);
        menuItem.selected = false;

        this.selectedValue = this.selectedItems.map((si) => si.id);
        this.propagateChange(this.selectedValue);
    }
}
