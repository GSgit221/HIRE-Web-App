import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenatsSigninComponent } from './tenats-signin.component';

describe('TenatsSigninComponent', () => {
  let component: TenatsSigninComponent;
  let fixture: ComponentFixture<TenatsSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenatsSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenatsSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
