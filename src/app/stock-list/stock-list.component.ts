import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { companyInfo } from '../companyInfo';
import { stockInfo } from '../stockInfo';

export interface dataInfo {
  companyInfo: companyInfo;
  index: number;
  stockInfo: stockInfo;
}

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit {
  enteredStock: string;
  stocksArray: string[] = [];
  stocksArrayString: string;
  companyInfo: companyInfo[];
  stocksInfo: stockInfo[];
  companyStocksArray: dataInfo[] = [];
  dataLoaded: boolean = false;
  counter: number = 0;

  constructor(private fetchDataService: FetchDataService) {}

  ngOnInit() {
    if (
      window.localStorage.getItem('stocks') === '' ||
      window.localStorage.getItem('stocks') === '[]' ||
      window.localStorage.getItem('stocks') === null
    ) {
      window.localStorage.setItem('stocks', '');
      this.dataLoaded = true;
    } else {
      this.stocksArrayString = window.localStorage.getItem('stocks');
      this.stocksArray = JSON.parse(this.stocksArrayString);
    }

    this.stocksArray.forEach((stock, index) => {
      const stockObject = {
        index: index,
        companyInfo: {},
        stockInfo: {},
      };
      this.fetchDataService.getAllCompanyData(stock).subscribe((data) => {
        console.log(data);
        this.companyInfo = data;
        this.companyInfo = this.companyInfo.result;
        this.companyInfo.forEach((company, index) => {
          if (stock === company.symbol) {
            stockObject.companyInfo = this.companyInfo[index];
            this.companyStocksArray[stockObject.index] = stockObject;
          }
        });
        if (this.counter === this.stocksArray.length - 1) {
          this.getStockInfo();
        }
        this.counter++;
      });
    });
  }

  trackStock() {
    this.stocksArray.push(this.enteredStock.toUpperCase());
    this.stocksArrayString = JSON.stringify(this.stocksArray);
    window.localStorage.setItem('stocks', this.stocksArrayString);
    this.enteredStock = '';
    window.location.reload();
  }

  removeCompanyStock(index) {
    this.stocksArray.splice(index, 1);
    this.companyStocksArray.splice(index, 1);
    window.localStorage.setItem('stocks', JSON.stringify(this.stocksArray));
  }

  getStockInfo() {
    this.counter = 0;
    this.companyStocksArray.forEach((companyStock, index) => {
      this.fetchDataService
        .getAllStockData(companyStock.companyInfo.symbol)
        .subscribe((data) => {
          this.companyStocksArray[index].stockInfo = data;
          if (
            this.stocksArray.length === 1 ||
            this.counter === this.stocksArray.length - 1
          ) {
            this.dataLoaded = true;
            console.log(this.companyStocksArray);
          }
          this.counter++;
        });
    });
  }
}
