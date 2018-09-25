import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidateItemComponent } from './new-candidate-item.component';

describe('NewCandidateItemComponent', () => {
  let component: NewCandidateItemComponent;
  let fixture: ComponentFixture<NewCandidateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCandidateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCandidateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
