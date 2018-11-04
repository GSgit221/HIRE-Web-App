import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenatsSignupComponent } from './tenats-signup.component';

describe('TenatsSignupComponent', () => {
  let component: TenatsSignupComponent;
  let fixture: ComponentFixture<TenatsSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenatsSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenatsSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
