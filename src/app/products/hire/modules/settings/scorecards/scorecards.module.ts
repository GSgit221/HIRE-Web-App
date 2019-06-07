import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../../modules/shared/shared.module';
import { ScorecardsComponent } from './scorecards.component';

const routes: Routes = [
    {
        path: '',
        component: ScorecardsComponent
    }
];
@NgModule({
    declarations: [ScorecardsComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScorecardsModule {}
