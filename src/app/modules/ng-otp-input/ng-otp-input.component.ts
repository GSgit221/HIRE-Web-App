import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Config } from '../models/config';
import { KeysPipe } from './keys.pipe';

@Component({
    selector: 'app-ng-otp-input',
    templateUrl: './ng-otp-input.component.html',
    styleUrls: ['./ng-otp-input.component.scss']
})
export class NgOtpInputComponent implements OnInit {
    @Input() config: Config = { length: 4 };
    @Output() onInputChange = new EventEmitter<string>();
    otpForm: FormGroup;
    inputControls: FormControl[] = new Array(this.config.length);
    componentKey =
        Math.random()
            .toString(36)
            .substring(2) + new Date().getTime().toString(36);
    constructor(private keysPipe: KeysPipe) {}

    ngOnInit() {
        this.otpForm = new FormGroup({});
        for (let index = 0; index < this.config.length; index++) {
            this.otpForm.addControl(this.getControlName(index), new FormControl());
        }
    }
    ngAfterViewInit(): void {
        let containerItem = document.getElementById(`c_${this.componentKey}`);
        if (containerItem) {
            let ele: any = containerItem.getElementsByClassName('.otp-input')[0];
            if (ele && ele.focus) {
                ele.focus();
            }
        }
    }
    private getControlName(idx) {
        return `ctrl_${idx}`;
    }

    ifLeftArrow(event) {
        return this.ifKeyCode(event, 37);
    }

    ifRightArrow(event) {
        return this.ifKeyCode(event, 39);
    }

    ifBackspaceOrDelete(event) {
        return this.ifKeyCode(event, 8) || this.ifKeyCode(event, 46);
    }

    ifKeyCode(event, targetCode) {
        var key = event.keyCode || event.charCode;
        return key == targetCode ? true : false;
    }

    onKeyUp($event, nextInputId, prevInputId) {
        nextInputId = this.appendKey(nextInputId);
        prevInputId = this.appendKey(prevInputId);
        if (this.ifRightArrow($event)) {
            this.setSelected(nextInputId);
            return;
        }
        if (this.ifLeftArrow($event)) {
            this.setSelected(prevInputId);
            return;
        }
        let isBackspace = this.ifBackspaceOrDelete($event);
        if (isBackspace && !$event.target.value) {
            this.setSelected(prevInputId);
            this.rebuildValue();
            return;
        }
        if (this.ifValidEntry($event)) {
            this.focusTo(nextInputId);
        }
        this.rebuildValue();
    }

    appendKey(id) {
        return `${id}_${this.componentKey}`;
    }

    setSelected(eleId) {
        this.focusTo(eleId);
        let ele: any = document.getElementById(eleId);
        if (ele && ele.setSelectionRange) {
            setTimeout(() => {
                ele.setSelectionRange(0, 1);
            }, 0);
        }
    }

    ifValidEntry(event) {
        var inp = String.fromCharCode(event.keyCode);
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return (
            isMobile ||
            /[a-zA-Z0-9-_]/.test(inp) ||
            (this.config.allowKeyCodes && this.config.allowKeyCodes.includes(event.keyCode))
        );
    }

    focusTo(eleId) {
        let ele: any = document.getElementById(eleId);
        if (ele) {
            ele.focus();
            setTimeout(() => {
                ele.selectionStart = ele.selectionEnd = 100;
            }, 0);
        }
    }

    rebuildValue() {
        let val = '';
        this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
            if (this.otpForm.controls[k].value) {
                val += this.otpForm.controls[k].value;
            }
        });
        this.onInputChange.emit(val);
    }

    pasteEvent(event) {
        var clipboardData = event.clipboardData;
        var pastedData = clipboardData.getData('text/plain');
        this.pasteCode(pastedData);
    }

    pasteCode(pastedData) {
        pastedData = pastedData.slice(0, 7);
        var count = 0;
        /* tslint:disable */
        for (let i = 0; i < pastedData.length; i++) {
            if (isNaN(pastedData[i])) {
                continue;
            }
            if (parseInt(pastedData[i]) >= 0 && parseInt(pastedData[i]) <= 9) {
                this.otpForm.controls['ctrl_' + count].setValue(pastedData[i]);
                count++;
                if (count == 6) {
                    break;
                }
            }
        }
        /* tslint:enable */
    }
}
