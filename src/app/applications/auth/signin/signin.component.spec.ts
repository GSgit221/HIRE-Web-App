import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsSigninComponent } from './signin.component';

describe('ApplicationsSigninComponent', () => {
  let component: ApplicationsSigninComponent;
  let fixture: ComponentFixture<ApplicationsSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
