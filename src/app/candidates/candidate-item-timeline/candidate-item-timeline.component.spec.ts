import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateItemTimelineComponent } from './candidate-item-timeline.component';

describe('CandidateItemTimelineComponent', () => {
  let component: CandidateItemTimelineComponent;
  let fixture: ComponentFixture<CandidateItemTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateItemTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateItemTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
