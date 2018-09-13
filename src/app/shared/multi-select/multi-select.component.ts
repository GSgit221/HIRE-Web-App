import { SelectItem } from 'primeng/api';
import { Component, OnInit, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, FormGroup, FormBuilder } from '@angular/forms';


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
    newUserForm: FormGroup;

    _items: any[];
    @Input()
    set items(items: any[]) {
        this._items = items;
        console.log('SET', this._items);
        if (this.selectedValue && this.selectedValue.length) {
            this.selectedValue.forEach(sv => {
                const item = this._items.find(_item => _item.user_id === sv);
                if (item) {
                    item.selected = true;
                    this.selectedItems.push(item);
                }
            });
        }
    }

    // Click outside of drop-down
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.elRef.nativeElement.children[0].contains(event.target)) {
            this.menuIsVisible = false;
        }
    }


    constructor(private elRef: ElementRef, private fb: FormBuilder) {
        this.newUserForm = this.fb.group({
            full_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    writeValue(value: any) {
        if (value !== undefined) {
            console.log('VALUE PASSED TO COMPONENT');
            console.log(value);
            this.selectedValue = value;
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
        console.log('select');
        item.selected = true;
        console.log(item);
        this.selectedItems.push(item);
        this.menuIsVisible = false;

        this.selectedValue = this.selectedItems.map(si => si.user_id);
        this.propagateChange(this.selectedValue);
    }
    onAddNewClick() {
        console.log('add new');
        this.menuIsVisible = false;
        this.newItemMode = true;
    }

    onAddnewItem(event) {
        event.preventDefault();
        this.newItemMode = false;
    }

    onCancelAddNewItem() {
        event.preventDefault();
        this.newItemMode = false;
    }

    onRemoveFromSelected(item) {
        this.selectedItems = this.selectedItems.filter(si => si.user_id !== item.user_id);
        const menuItem = this._items.find(mi => mi.user_id === item.user_id);
        menuItem.selected = false;

        this.selectedValue = this.selectedItems.map(si => si.user_id);
        this.propagateChange(this.selectedValue);
    }
}
