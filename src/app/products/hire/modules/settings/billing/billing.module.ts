import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../../modules/shared/shared.module';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { BillingPlanComponent } from './billing-plan/billing-plan.component';
import { BillingComponent } from './billing.component';

const routes: Routes = [
    {
        path: '',
        component: BillingComponent
    }
];
@NgModule({
    declarations: [BillingComponent, BillingDetailsComponent, BillingHistoryComponent, BillingPlanComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingModule {}
