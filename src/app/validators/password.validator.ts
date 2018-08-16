import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        const confirmPassword = AC.get('confirm_password').value;
        if (password !== confirmPassword) {
            AC.get('confirm_password').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
