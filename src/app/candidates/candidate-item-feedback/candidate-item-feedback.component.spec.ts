import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateItemFeedbackComponent } from './candidate-item-feedback.component';

describe('CandidateItemFeedbackComponent', () => {
  let component: CandidateItemFeedbackComponent;
  let fixture: ComponentFixture<CandidateItemFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateItemFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateItemFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
