import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components//page-not-found/page-not-found.component';
import { AppComponent } from './components/app/app.component';
import { SharedModule } from './modules/shared/shared.module';
import { effects, reducers } from './store';

export const metaReducers: Array<MetaReducer<any>> = !environment.production ? [storeFreeze] : [];

@NgModule({
    declarations: [AppComponent, PageNotFoundComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule,
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
