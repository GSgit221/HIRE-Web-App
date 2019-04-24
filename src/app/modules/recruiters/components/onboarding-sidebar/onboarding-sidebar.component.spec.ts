import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSidebarComponent } from './onboarding-sidebar.component';

describe('OnboardingSidebarComponent', () => {
    let component: OnboardingSidebarComponent;
    let fixture: ComponentFixture<OnboardingSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OnboardingSidebarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
