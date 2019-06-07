import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/auth.service';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromStore from './../../store';
import * as fromSelectors from './../../store/selectors';
import { User } from './../models/user';

@Component({
    selector: 'app-start-component',
    template: ``,
    styles: []
})
export class StartComponent {
    constructor(private store: Store<fromStore.State>, private authService: AuthService, private router: Router) {
        this.store
            .pipe(
                select(fromSelectors.getUserEntity),
                filter((user) => !!user)
            )
            .subscribe((user: User) => {
                this.router.navigateByUrl(`tenant/${user.tenant_id}/hire`);
            });
    }
}
