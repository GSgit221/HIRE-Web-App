import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
    {
        path: '',
        component: PeopleListComponent
    }
];
@NgModule({
    declarations: [PeopleListComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleModule {}
