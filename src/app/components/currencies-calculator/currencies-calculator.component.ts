import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rate } from '../../models/rate';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-currencies-calculator',
  templateUrl: './currencies-calculator.component.html',
  styleUrls: ['./currencies-calculator.component.scss']
})
export class CurrenciesCalculatorComponent implements OnInit {
  @Input() currencies: Rate[] = new Array();
  modelForm: FormGroup;
  resultCurrencyCode: string;
  isValidFormSubmitted: boolean = null;
  resultAmount: string;

  formErrors = {
    amount: '',
    initialCurrency: '',
    resultCurrency: ''
  }

  private validationMessages = {
    amount: {
      required: 'Kwota jest wymagana',
      pattern: 'Kwota jest nieprawidłowa'
    },
    initialCurrency: {
      required: 'Wyjściowa waluta jest wymagana'
    },
    resultCurrency: {
      required: 'Docelowa waluta jest wymagana'
    }
  }

  constructor(private formBuilder : FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.validateControls();
    });

    this.validateControls();
  }

  onSubmit(form: FormGroup) : void {
    this.isValidFormSubmitted = false;
    this.validateControls();

    if(this.modelForm.invalid) {
      return;
    }

    this.isValidFormSubmitted = true;

    let amount: number = form.get('amount').value;
    let initialCurrencyCode: string = form.get('initialCurrency').value;
    this.resultCurrencyCode = form.get('resultCurrency').value;

    this.resultAmount = this.convertCurrencies(amount, initialCurrencyCode, this.resultCurrencyCode).toFixed(2);
  }

  initializeForm(): void {
    this.modelForm = this.formBuilder.group({
      // amount: ['', Validators.compose([Validators.required, this.isDigit])],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+((\.|\,)[0-9]{1,2})?$')]],
      initialCurrency: ['', Validators.required],
      resultCurrency: ['', Validators.required]
    });
  }

  validateControls() {
    const form = this.modelForm;

    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.invalid && this.isValidFormSubmitted != null && !this.isValidFormSubmitted) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }

  private convertCurrencies(amount: number, initialCurrencyCode: string, resultCurrencyCode: string): number {
    if(initialCurrencyCode === this.resultCurrencyCode) {
      return amount;
    }

    let initialCurrency: Rate = this.currencies.find(currency => currency.code ===initialCurrencyCode);
    let resultCurrency: Rate = this.currencies.find(currency => currency.code === this.resultCurrencyCode);

    if(initialCurrencyCode === 'PLN') {
      return this.calculateAmountFromPLN(amount, resultCurrency.ask);
    }

    if(this.resultCurrencyCode === 'PLN') {
      return this.calculateAmountToPLN(amount, initialCurrency.bid);
    }

    let resultPLN: number = this.calculateAmountToPLN(amount, this.calculateAverageExchangeRate(initialCurrency));
    return this.calculateAmountFromPLN(resultPLN, this.calculateAverageExchangeRate(resultCurrency));
  }
;

  private calculateAmountFromPLN(amount: number, exchangeRate: number): number {
    return amount / exchangeRate;
  }

  private calculateAmountToPLN(amount: number, exchangeRate: number): number {
    return amount * exchangeRate;
  }

  private calculateAverageExchangeRate(currency: Rate): number {
    return (currency.ask + currency.bid)/2;
  }
}
