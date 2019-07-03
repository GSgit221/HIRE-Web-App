import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateBlockComponent } from './candidate-block.component';

describe('CandidateBlockComponent', () => {
    let component: CandidateBlockComponent;
    let fixture: ComponentFixture<CandidateBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CandidateBlockComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CandidateBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
