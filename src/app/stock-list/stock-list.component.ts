import { Component, Input, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit {
  enteredStock: string;
  stocksArray: string[] = [];
  stocksArrayString: string;
  companyStocksArray: any[] = [];
  companyInfo;
  stocksInfo;
  dataLoaded = false;

  constructor(private fetchDataService: FetchDataService) {}

  ngOnInit() {
    this.stocksArrayString = window.localStorage.getItem('stocks');
    this.stocksArray = JSON.parse(this.stocksArrayString);

    this.stocksArray.forEach((stock, index) => {
      const stockObject = {
        index: index,
        companyInfo: [],
        stockInfo: [],
      };
      this.fetchDataService.getAllCompanyData(stock).subscribe((data) => {
        this.companyInfo = data;
        this.companyInfo = this.companyInfo.result;
        this.companyInfo.forEach((company, index) => {
          if (stock === company.symbol) {
            stockObject.companyInfo = this.companyInfo[index];
          }
        });
        this.fetchDataService.getAllStockData(stock).subscribe((data) => {
          this.stocksInfo = data;
          stockObject.stockInfo = this.stocksInfo;
          this.companyStocksArray[stockObject.index] = stockObject;
          this.dataLoaded = true;
        });
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
}
