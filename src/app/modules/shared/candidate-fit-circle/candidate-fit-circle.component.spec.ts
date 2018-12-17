import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFitCircleComponent } from './candidate-fit-circle.component';

describe('CandidateFitCircleComponent', () => {
    let component: CandidateFitCircleComponent;
    let fixture: ComponentFixture<CandidateFitCircleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CandidateFitCircleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CandidateFitCircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
