import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  stockSymbol: string;
  data: any;
  tempData: any[] = [];
  dataLoaded = false;

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
        change: null,
        month: month - 2,
      },
      {
        change: null,
        month: month - 1,
      },
      {
        change: null,
        month,
      },
    ];

    this.fetchDataService.getInsiderSentimentData(this.stockSymbol).subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
        this.data = this.data.data;
        this.data.forEach((item, index) => {
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
        console.log(this.tempData);
        this.data = this.tempData;
        this.dataLoaded = true;
      },
    });
  }
}
