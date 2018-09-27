import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemEditComponent } from './job-item-edit.component';

describe('JobItemEditComponent', () => {
  let component: JobItemEditComponent;
  let fixture: ComponentFixture<JobItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
