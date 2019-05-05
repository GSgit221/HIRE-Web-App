import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromActions from '../../../store/actions';
import * as fromReducers from '../../../store/reducers';
import { AuthService } from './../../../modules/auth/auth.service';
import { SharedModule } from './../../../modules/shared/shared.module';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, PageNotFoundComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                SharedModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    products: combineReducers(fromReducers.reducers)
                })
            ],
            providers: [AuthService]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
