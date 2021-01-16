import { Component, Input, OnInit } from '@angular/core';
import { Rate } from '../../models/rate';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss']
})
export class CurrenciesListComponent implements OnInit {
  @Input() currentDate: string;
  @Input() currencies: Rate[];

  constructor() { }

  ngOnInit(): void {
  }

}
