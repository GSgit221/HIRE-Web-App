import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ConditionalValidator {
    static validate(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            console.log(condition);
            if (!condition()) {
                return null;
            }
            return validator(control);
        };
    }
}
