import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersAuthComponent } from './recruiters-auth.component';

describe('RecruitersAuthComponent', () => {
    let component: RecruitersAuthComponent;
    let fixture: ComponentFixture<RecruitersAuthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecruitersAuthComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecruitersAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
