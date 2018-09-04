import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemUnpublishedComponent } from './job-item-unpublished.component';

describe('JobItemUnpublishedComponent', () => {
  let component: JobItemUnpublishedComponent;
  let fixture: ComponentFixture<JobItemUnpublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobItemUnpublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemUnpublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
