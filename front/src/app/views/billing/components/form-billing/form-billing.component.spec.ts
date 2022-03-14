import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBillingComponent } from './form-billing.component';

describe('FormBillingComponent', () => {
  let component: FormBillingComponent;
  let fixture: ComponentFixture<FormBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
