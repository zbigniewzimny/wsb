import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private httpClient: HttpClient) { }

  getCurrencies(): Observable<any> {
    const url = `https://api.nbp.pl/api/exchangerates/tables/c/?format=json`;
    return this.httpClient.get(url);
 }
}
