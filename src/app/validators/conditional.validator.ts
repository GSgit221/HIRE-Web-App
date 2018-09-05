import { ValidatorFn, AbstractControl } from '@angular/forms';
export class ConditionalValidator {
    static validate(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!condition()) {
                return null;
            }
            return validator(control);
        };
    }

}
