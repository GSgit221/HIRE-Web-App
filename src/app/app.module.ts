import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './core/components//page-not-found/page-not-found.component';
import { AppComponent } from './core/components/app/app.component';
import { SharedModule } from './modules/shared/shared.module';
import { CustomSerializer, effects, reducers } from './store';

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
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        },
        { provide: AngularFirestore }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
