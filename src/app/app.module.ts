import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilitiesService } from '@app/core/services';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { storeFreeze } from 'ngrx-store-freeze';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/components/app/app.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { SharedModule } from './modules/shared/shared.module';
import { CustomSerializer, effects, reducers } from './store';

export const metaReducers: Array<MetaReducer<any>> = !environment.production ? [storeFreeze] : [];
let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleClientId)
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [AppComponent, PageNotFoundComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule,
        ToastrModule.forRoot(),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        },
        { provide: AngularFirestore },
        UtilitiesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
