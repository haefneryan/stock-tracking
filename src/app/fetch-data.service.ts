import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { companyData } from './companyData';
import { stockInfo } from './stockInfo';
import { sentimentInfo } from './sentimentInfo';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  getAllCompanyData(stock: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(
      `https://finnhub.io/api/v1/search?token=bu4f8kn48v6uehqi3cqg&q=${stock}`
    );
  }

  getAllStockData(stock: string): Observable<stockInfo> {
    return this.http.get<stockInfo>(
      `https://finnhub.io/api/v1/quote?token=bu4f8kn48v6uehqi3cqg&symbol=${stock}`
    );
  }

  getInsiderSentimentData(stock: string): Observable<sentimentInfo> {
    return this.http.get<sentimentInfo>(
      `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stock}&from=2015-01-01&to=2022-08-01&token=bu4f8kn48v6uehqi3cqg`
    );
  }
}
