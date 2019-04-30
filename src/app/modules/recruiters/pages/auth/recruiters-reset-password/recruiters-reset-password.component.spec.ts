import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersResetPasswordComponent } from './recruiters-reset-password.component';

describe('RecruitersResetPasswordComponent', () => {
    let component: RecruitersResetPasswordComponent;
    let fixture: ComponentFixture<RecruitersResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecruitersResetPasswordComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecruitersResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
