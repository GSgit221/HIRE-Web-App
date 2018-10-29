import { UserService } from './../../services/user.service';
import { Component, OnInit, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';


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
    @Input()
    set items(items: any[]) {
        console.log('SET ITEMS', items);
        if (items && items.length) {
            this.selectedItems = [];
            items.forEach(item => {
                if (!this._items.find(_item => _item.id === item.id)) {
                    this._items.push(item);
                }
            });
            this.setSelected();
        }
    }
    @Output() newUser = new EventEmitter<User>();

    // Click outside of drop-down
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.elRef.nativeElement.children[0].contains(event.target)) {
            this.menuIsVisible = false;
        }
    }


    constructor(private elRef: ElementRef, private fb: FormBuilder, private userService: UserService) {
        this.newUserForm = this.fb.group({
            full_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    private setSelected() {
        if (this.selectedValue && this.selectedValue.length) {
            this.selectedValue.forEach(sv => {
                const item = this._items.find(_item => _item.id === sv);
                if (item) {
                    item.selected = true;
                    this.selectedItems.push(item);
                }
            });
        }
    }

    writeValue(value: any) {
        if (value !== undefined) {
            console.log('VALUE PASSED TO COMPONENT:', value);
            this.selectedValue = value;
            this.setSelected();
        }
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    ngOnInit() {
    }

    onMenuToggle() {
        this.menuIsVisible = !this.menuIsVisible;
    }


    onSelectItem(item) {
        item.selected = true;
        this.selectedItems.push(item);
        this.menuIsVisible = false;

        this.selectedValue = this.selectedItems.map(si => si.id);
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
            this.markFormGroupTouched(form);
            return;
        }
        this.contentLoading = true;
        this.userService.create(form.value)
            .subscribe((response: User) => {
                this.contentLoading = false;
                this.newItemMode = false;
                this.newUser.next(response);
                setTimeout(() => {
                    const newItem = this._items.find(_item => _item.id === response.id);
                    if (newItem) {
                        newItem.selected = true;
                        this.selectedItems.push(newItem);
                    }
                }, 1000);
            }, error => {
                console.log(error);
                this.contentLoading = false;
            });
    }

    onCancelAddNewItem() {
        event.preventDefault();
        this.newItemMode = false;
    }

    onRemoveFromSelected(item) {
        this.selectedItems = this.selectedItems.filter(si => si.id !== item.id);
        const menuItem = this._items.find(mi => mi.id === item.id);
        menuItem.selected = false;

        this.selectedValue = this.selectedItems.map(si => si.id);
        this.propagateChange(this.selectedValue);
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

}
