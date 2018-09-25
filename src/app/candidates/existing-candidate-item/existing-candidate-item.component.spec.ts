import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCandidateItemComponent } from './existing-candidate-item.component';

describe('ExistingCandidateItemComponent', () => {
  let component: ExistingCandidateItemComponent;
  let fixture: ComponentFixture<ExistingCandidateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingCandidateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCandidateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
