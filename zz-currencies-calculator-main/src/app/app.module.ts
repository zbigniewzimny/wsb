import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component';
import { CurrenciesCalculatorComponent } from './components/currencies-calculator/currencies-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrenciesListComponent,
    CurrenciesCalculatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
