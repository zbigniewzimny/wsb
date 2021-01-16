import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesCalculatorComponent } from './currencies-calculator.component';

describe('CurrenciesCalculatorComponent', () => {
  let component: CurrenciesCalculatorComponent;
  let fixture: ComponentFixture<CurrenciesCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
