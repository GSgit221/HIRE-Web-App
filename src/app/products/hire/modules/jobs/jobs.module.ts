import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxCurrencyModule } from 'ngx-currency';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from './../../../../modules/shared/shared.module';

import { CandidateBlockComponent } from './candidate-block/candidate-block.component';
import { CandidateItemFeedbackComponent } from './candidate-item-feedback/candidate-item-feedback.component';
import { CandidateItemTimelineComponent } from './candidate-item-timeline/candidate-item-timeline.component';
import { CandidateItemComponent } from './candidate-item/candidate-item.component';
import { EmailModalComponent } from './components/email-modal/email-modal.component';
import { SwitchComponent } from './components/switch/switch.component';
import * as fromGuards from './guards';
import { JobItemEditComponent } from './job-item-edit/job-item-edit.component';
import { JobItemNewComponent } from './job-item-new/job-item-new.component';
import { JobItemViewComponent } from './job-item-view/job-item-view.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { NewCandidateItemComponent } from './new-candidate-item/new-candidate-item.component';
import { StageSettingsComponent } from './stages/stage-settings/stage-settings.component';
import { effects, reducers } from './store';

const routes: Routes = [
    {
        path: '',
        component: JobsListComponent,
        canActivate: [fromGuards.JobsGuard]
    },
    {
        path: ':id',
        component: JobItemComponent,
        canActivate: [fromGuards.JobsGuard]
    },
    {
        path: ':jobId/candidate/:candidateId',
        component: CandidateItemComponent,
        canActivate: [fromGuards.CandidatesGuard]
    },
    {
        path: ':id/stages/:stageId',
        component: StageSettingsComponent
    }
];
@NgModule({
    declarations: [
        JobsListComponent,
        JobItemComponent,
        JobItemEditComponent,
        JobItemViewComponent,
        CandidateItemComponent,
        StageSettingsComponent,
        NewCandidateItemComponent,
        JobItemNewComponent,
        CandidateItemFeedbackComponent,
        CandidateItemTimelineComponent,
        CandidateBlockComponent,
        EmailModalComponent,
        SwitchComponent
    ],
    providers: [...fromGuards.guards],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxCurrencyModule,
        InputSwitchModule,
        StoreModule.forFeature('jobs', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [RouterModule]
})
export class JobsModule {}
