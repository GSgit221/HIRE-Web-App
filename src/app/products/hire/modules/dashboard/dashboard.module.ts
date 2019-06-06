import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../modules/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TakeoverComponent } from './sidebar/takeover/takeover.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'jobs'
            },
            {
                path: 'jobs',
                loadChildren: './../jobs/jobs.module#JobsModule'
            },
            {
                path: 'people',
                loadChildren: './../people/people.module#PeopleModule'
            },
            {
                path: 'settings',
                loadChildren: './../settings/settings.module#SettingsModule'
            }
        ]
    }
];
@NgModule({
    declarations: [DashboardComponent, SidebarComponent, TakeoverComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardModule {}
