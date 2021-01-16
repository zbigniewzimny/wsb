import { Component, OnInit } from '@angular/core';
import { Rate } from './models/rate';
import { CurrenciesService } from './services/currencies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currency-calculator';
  currenciesDate: string;
  rates: Rate[];
  loading: boolean = false;
  errorMessage;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    const currencies = this.getCurrencies();
  }

  public getCurrencies() {
    this.loading = true;
    this.errorMessage = '';

    this.currenciesService.getCurrencies().subscribe(
      (response) => {
        const data = response[0];
        console.log('response received');

        this.currenciesDate = data.effectiveDate;
        this.rates = data.rates;
      },
      (error) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
