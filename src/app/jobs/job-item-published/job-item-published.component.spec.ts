import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemPublishedComponent } from './job-item-published.component';

describe('JobItemPublishedComponent', () => {
  let component: JobItemPublishedComponent;
  let fixture: ComponentFixture<JobItemPublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobItemPublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
