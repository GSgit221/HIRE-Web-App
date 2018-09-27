import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemViewComponent } from './job-item-view.component';

describe('JobItemViewComponent', () => {
  let component: JobItemViewComponent;
  let fixture: ComponentFixture<JobItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
