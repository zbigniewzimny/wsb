import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesListComponent } from './currencies-list.component';

describe('CurrenciesListComponent', () => {
  let component: CurrenciesListComponent;
  let fixture: ComponentFixture<CurrenciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
