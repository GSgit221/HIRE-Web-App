import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { TakeoverComponent } from './dashboard/sidebar/takeover/takeover.component';

import { JobEffects } from './effects/job/job.effects';
import { UserEffects } from './effects/user/user.effects';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { metaReducers, reducers } from './reducers';

import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, DashboardComponent, PageNotFoundComponent, SidebarComponent, TakeoverComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects, UserEffects, JobEffects])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
