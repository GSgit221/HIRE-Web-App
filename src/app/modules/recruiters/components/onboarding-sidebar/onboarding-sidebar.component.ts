import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../../../core/models/user';
import * as fromStore from '../../../../store';
import * as fromSelectors from '../../../../store/selectors';
import { AuthService } from '../../../auth/auth.service';
import { RecruiterService } from './../../../../core/services/recruiter.service';
import { SiteService } from './../../../../core/services/site.service';

@Component({
    selector: 'app-onboarding-sidebar',
    templateUrl: './onboarding-sidebar.component.html',
    styleUrls: ['./onboarding-sidebar.component.scss']
})
export class OnboardingSidebarComponent implements OnInit, OnDestroy {
    userSubscription: Subscription;
    user: User;
    mainColor = '#ffffff';
    logoUrl = '';
    steps = [];
    progress = 0;
    stepPercents = 0;

    constructor(
        private authService: AuthService,
        private store: Store<fromStore.State>,
        private route: ActivatedRoute,
        private siteService: SiteService,
        private recruiterService: RecruiterService
    ) {
        this.siteService.getTheme().subscribe((theme: { color: string; logo_url: string }) => {
            this.logoUrl = theme.logo_url;
        });
        this.recruiterService.getOnboardingSteps().subscribe((steps) => {
            this.steps = steps;
            this._calculateProgress();
        });
        this.recruiterService.getOnboardingStepCompletedSubject().subscribe((data) => {
            const step = this.steps.find((s) => s.id === data.step);
            if (step) {
                step.completed = true;
            }
            this.recruiterService.saveSteps(this.steps).subscribe((response) => console.log(response));
            this._calculateProgress();
        });
        this.userSubscription = this.store
            .pipe(
                select(fromSelectors.getUserEntity),
                filter((user) => !!user)
            )
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    ngOnInit() {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    _calculateProgress() {
        this.stepPercents = Math.floor(100 / this.steps.length);
        this.progress = this.steps.reduce((prev, cur) => (cur.completed ? prev + 1 : prev), 0) * this.stepPercents;
    }
}
