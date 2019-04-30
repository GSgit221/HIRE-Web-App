import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersSetPasswordComponent } from './recruiters-set-password.component';

describe('RecruitersSetPasswordComponent', () => {
    let component: RecruitersSetPasswordComponent;
    let fixture: ComponentFixture<RecruitersSetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecruitersSetPasswordComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecruitersSetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
