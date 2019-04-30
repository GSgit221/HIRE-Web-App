import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersSigninComponent } from './recruiters-signin.component';

describe('RecruitersSigninComponent', () => {
    let component: RecruitersSigninComponent;
    let fixture: ComponentFixture<RecruitersSigninComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecruitersSigninComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecruitersSigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
