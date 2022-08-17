import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  enteredStock: string;
  stocksArray: string[] = [];
  stocksArrayString: string;

  constructor() {}

  ngOnInit() {
    this.stocksArrayString = window.localStorage.getItem('stocks');
    this.stocksArray = JSON.parse(this.stocksArrayString);
  }

  trackStock() {
    this.stocksArray.push(this.enteredStock.toUpperCase());
    this.stocksArrayString = JSON.stringify(this.stocksArray);
    window.localStorage.setItem('stocks', this.stocksArrayString);
    this.enteredStock = '';
    window.location.reload();
  }
}
