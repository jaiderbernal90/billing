import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGoBackComponent } from './button-go-back.component';

describe('ButtonGoBackComponent', () => {
  let component: ButtonGoBackComponent;
  let fixture: ComponentFixture<ButtonGoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGoBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
