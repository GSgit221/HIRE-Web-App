import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormHelperService {
    constructor() {}

    markFormGroupTouched(formGroup: FormGroup) {
        (Object as any).values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach((c) => this.markFormGroupTouched(c));
            }
        });
    }

    validateEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
