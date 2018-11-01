import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenatsResetPasswordComponent } from './tenats-reset-password.component';

describe('TenatsResetPasswordComponent', () => {
  let component: TenatsResetPasswordComponent;
  let fixture: ComponentFixture<TenatsResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenatsResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenatsResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
