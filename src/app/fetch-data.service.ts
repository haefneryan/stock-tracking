import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companyData } from './companyData';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  getAllCompanyData(stock: string) {
    return this.http.get(
      `https://finnhub.io/api/v1/search?token=bu4f8kn48v6uehqi3cqg&q=${stock}`
    );
  }

  getAllStockData(stock: string) {
    return this.http.get(
      `https://finnhub.io/api/v1/quote?token=bu4f8kn48v6uehqi3cqg&symbol=${stock}`
    );
  }

  getInsiderSentimentData(stock: string) {
    return this.http.get(
      `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stock}&from=2015-01-01&to=2022-08-01&token=bu4f8kn48v6uehqi3cqg`
    );
  }
}
