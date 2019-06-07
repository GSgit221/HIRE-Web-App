import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UtilitiesService } from './utilities.service';

import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class RecruiterService {
    apiURL: string = environment.apiUrl;
    tenantId = 'undefined';
    baseURL = '';
    defaultSteps = [
        {
            id: 'company-details',
            title: 'Company Details',
            iconUrl: '/assets/images/icons/personal-details.svg',
            completed: false
        },
        { id: 'documents', title: 'Documents', iconUrl: '/assets/images/icons/questions.svg', completed: false },
        {
            id: 'approval',
            title: 'Submit For Approval',
            iconUrl: '/assets/images/icons/approval.svg',
            completed: false
        }
    ];
    private onboardingStepsSubject: BehaviorSubject<any>;
    private onboardingStepCompletedSubject = new Subject<any>();
    private onboardingStepSaveSubject = new Subject<any>();
    private onboardingBackClickSubject = new Subject<any>();

    constructor(private http: HttpClient, private utilities: UtilitiesService) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;

        this.onboardingStepsSubject = new BehaviorSubject<any>(this.defaultSteps);
    }

    getOnboarding() {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
        return this.http.get(`${this.baseURL}/onboarding`);
    }

    updateOnboarding(data) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
        return this.http.put(`${this.baseURL}/onboarding`, data);
    }

    getOnboardingStepCompletedSubject(): Observable<any> {
        return this.onboardingStepCompletedSubject.asObservable();
    }

    getOnboardingStepSaveSubject(): Observable<any> {
        return this.onboardingStepSaveSubject.asObservable();
    }

    getOnboardingBackClickSubject(): Observable<any> {
        return this.onboardingBackClickSubject.asObservable();
    }

    onboardingStepCompleted(data) {
        this.onboardingStepCompletedSubject.next(data);
    }

    onboardingStepSave(data) {
        this.onboardingStepSaveSubject.next(data);
    }

    onboardingBackClicked(data) {
        this.onboardingBackClickSubject.next(data);
    }

    loadOnboardingStepsFromApi() {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
        return this.http.get(`${this.baseURL}/onboarding/steps`);
    }

    saveSteps(steps) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
        return this.http.put(`${this.baseURL}/onboarding/steps`, steps);
    }

    loadOnboardingSteps() {
        this.loadOnboardingStepsFromApi().subscribe(
            (response: any) => {
                if (response) {
                    return this.onboardingStepsSubject.next(response);
                }
            },
            (errorResponse) => {
                console.error(errorResponse);
            }
        );
    }

    getOnboardingSteps(): Observable<any[]> {
        return this.onboardingStepsSubject.asObservable();
    }

    uploadDocument(data) {
        this.tenantId = this.utilities.getTenant();
        this.baseURL = `${this.apiURL}/tenants/${this.tenantId}`;
        return this.http.post(`${this.baseURL}/onboarding/documents`, data);
    }
}
