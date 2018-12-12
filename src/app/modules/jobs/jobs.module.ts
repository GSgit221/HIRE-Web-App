import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CandidateItemFeedbackComponent } from './candidate-item-feedback/candidate-item-feedback.component';
import { CandidateItemTimelineComponent } from './candidate-item-timeline/candidate-item-timeline.component';
import { CandidateItemComponent } from './candidate-item/candidate-item.component';
import { JobItemEditComponent } from './job-item-edit/job-item-edit.component';
import { JobItemNewComponent } from './job-item-new/job-item-new.component';
import { JobItemViewComponent } from './job-item-view/job-item-view.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { NewCandidateItemComponent } from './new-candidate-item/new-candidate-item.component';
import { StageSettingsComponent } from './stages/stage-settings/stage-settings.component';

const routes: Routes = [
    {
        path: '',
        component: JobsListComponent
    },
    {
        path: ':id',
        component: JobItemComponent
    },
    {
        path: ':jobId/candidate/:candidateId',
        component: CandidateItemComponent
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
        CandidateItemTimelineComponent
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsModule {}
