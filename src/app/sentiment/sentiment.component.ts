import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { sentimentDetail } from '../sentimentDetail';
import { sentimentInfo } from '../sentimentInfo';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  stockSymbol: string;
  data: sentimentInfo;
  sentimentData: sentimentDetail[];
  tempData: sentimentDetail[] = [];
  dataLoaded: boolean = false;

  constructor(
    private fetchDataService: FetchDataService,
    private route: ActivatedRoute
  ) {
    this.stockSymbol = this.route.snapshot.params.symbol;
  }

  ngOnInit() {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;

    this.tempData = [
      {
        change: 0,
        month: month - 2,
        mspr: 0,
        symbol: '',
        year: 0,
      },
      {
        change: 0,
        month: month - 1,
        mspr: 0,
        symbol: '',
        year: 0,
      },
      {
        change: 0,
        month: month,
        mspr: 0,
        symbol: '',
        year: 0,
      },
    ];

    this.fetchDataService.getInsiderSentimentData(this.stockSymbol).subscribe({
      next: (data) => {
        this.data = data;
        this.sentimentData = this.data.data;
        this.sentimentData.forEach((item) => {
          if (item.year === year && item.month > month - 3) {
            if (item.month === month - 2) {
              this.tempData[0] = item;
            } else if (item.month === month - 1) {
              this.tempData[1] = item;
            } else if (item.month === month) {
              this.tempData[2] = item;
            }
          }
        });
        this.data.data = this.tempData;
        this.dataLoaded = true;
      },
    });
  }
}
