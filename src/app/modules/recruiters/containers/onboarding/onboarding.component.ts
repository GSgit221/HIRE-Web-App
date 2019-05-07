import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RecruiterService } from './../../../../core/services/recruiter.service';
import { SiteService } from './../../../../core/services/site.service';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
    steps = [];
    contentLoading = false;
    constructor(private siteService: SiteService, private recruiterService: RecruiterService, private router: Router) {
        this.siteService.loadTheme();
        this.recruiterService.loadOnboardingSteps();
        this.recruiterService.getOnboardingSteps().subscribe((steps) => {
            this.steps = steps;
            const index = this.steps
                .slice()
                .reverse()
                .findIndex((s) => s.completed);
            const count = this.steps.length - 1;
            const lastCompletedIndex = index >= 0 ? count - index : index;
            if (lastCompletedIndex !== -1) {
                const url = `/recruiters/onboarding/${this.steps[lastCompletedIndex + 1].id}`;
                this.router.navigateByUrl(url);
            }
        });
        this.recruiterService.getOnboardingStepCompletedSubject().subscribe((data) => {
            console.log('Completed step:', data);
            this.recruiterService
                .updateOnboarding({ [data.stepName]: data.value })
                .subscribe((response) => console.log(response));
            const completedStepIndex = this.steps.findIndex((s) => s.id === data.step);
            if (completedStepIndex !== -1) {
                const nextStepIndex = completedStepIndex + 1;
                if (this.steps[nextStepIndex]) {
                    // navigate
                    const url = `/recruiters/onboarding/${this.steps[nextStepIndex].id}`;
                    this.router.navigateByUrl(url);
                }
            }
        });

        this.recruiterService.getOnboardingStepSaveSubject().subscribe((data) => {
            this.recruiterService
                .updateOnboarding({ [data.stepName]: data.value })
                .subscribe((response) => console.log(response));
        });

        this.recruiterService.getOnboardingBackClickSubject().subscribe((data) => {
            const stepIndex = this.steps.findIndex((s) => s.id === data.step);
            if (stepIndex !== -1) {
                const nextStepIndex = stepIndex - 1;
                if (this.steps[nextStepIndex]) {
                    const url = `/recruiters/onboarding/${this.steps[nextStepIndex].id}`;
                    this.router.navigateByUrl(url);
                }
            }
        });
    }

    ngOnInit() {}
}
