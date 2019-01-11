import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromEmailsSelectors from '../store/selectors/emails.selector';
import { EmailTemplate } from './../../../../models/email-template';

@Injectable()
export class EmailExistsGuard implements CanActivate {
    constructor(private store: Store<fromStore.EmailsState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this.checkStore().pipe(
            switchMap(() => {
                return this.hasEmail(route.params.emailTemplateId).pipe(
                    map((exists: boolean) => {
                        if (!exists) {
                            this.router.navigate(['/dashboard/settings/email-templates']);
                        } else {
                            return true;
                        }
                    })
                );
            })
        );
    }

    hasEmail(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromEmailsSelectors.getEmailsEntities),
            map((entities: { [key: string]: EmailTemplate }) => !!entities[id]),
            take(1)
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromEmailsSelectors.getEmailsLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadEmails());
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}
