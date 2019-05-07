import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {
    transform(value: any): any {
        if (value && value.role) {
            switch (value.role) {
                case 'superadmin':
                case 'account_owner':
                    return 'Account Owner';
                case 'recruiter':
                    return 'Recruiter';
                case 'admin':
                    return 'Admin';
                default:
                    return '';
            }
        } else {
            return '';
        }
    }
}
