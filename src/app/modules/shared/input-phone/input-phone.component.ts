import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
    selector: 'app-input-phone',
    templateUrl: './input-phone.component.html',
    styleUrls: ['./input-phone.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPhoneComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputPhoneComponent),
            multi: true
        }
    ]
})
export class InputPhoneComponent implements ControlValueAccessor, Validator, OnInit {
    pluginInstance: any;
    phoneValue: string;
    isValid: boolean;
    blur = false;
    @ViewChild('phoneInput') phoneInput: ElementRef;
    constructor(private elRef: ElementRef, private fb: FormBuilder) {}

    ngOnInit() {}
    @Input()
    set country(country: any) {
        if (country && country.length) {
            // console.log(country);
            setTimeout(() => {
                this.pluginInstance.intlTelInput('setCountry', country);
            }, 0);
        }
    }

    writeValue(value: any) {
        if (value !== undefined) {
            // console.log('☎️ VALUE PASSED TO COMPONENT:', value);
            this.phoneInput.nativeElement.value = value;
            if (this.pluginInstance) {
                this.pluginInstance.intlTelInput('setNumber', value);
            }
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    onFocus() {
        this.elRef.nativeElement.classList.add('focus');
        this.blur = false;
    }
    onBlur() {
        this.elRef.nativeElement.classList.remove('focus');
        this.blur = true;
        this.onTouched();
    }

    onTouched = () => {};

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    telInstance(inst) {
        this.pluginInstance = inst;
    }

    onChange(event) {
        this.onTouched();
        const w: any = window;
        if (typeof w.intlTelInputUtils !== 'undefined') {
            const currentText = this.pluginInstance.intlTelInput('getNumber', w.intlTelInputUtils.numberFormat.E164);
            if (typeof currentText === 'string') {
                this.pluginInstance.intlTelInput('setNumber', currentText);
                this.propagateChange(this.phoneInput.nativeElement.value);
            }
        }
    }

    public validate() {
        const w: any = window;
        if (typeof this.pluginInstance !== 'undefined' && typeof w.intlTelInputUtils !== 'undefined') {
            const valid = w.intlTelInputUtils.isValidNumber(this.pluginInstance.intlTelInput('getNumber'));
            const response = valid
                ? null
                : {
                      incorrect_number: true
                  };
            return response;
        } else {
            return null;
        }
    }
}
