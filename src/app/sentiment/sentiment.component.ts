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
  dataLength: number;
  dataLoaded = false;

  constructor(
    private fetchDataService: FetchDataService,
    private route: ActivatedRoute
  ) {
    this.stockSymbol = this.route.snapshot.params.symbol;
  }

  ngOnInit() {
    this.fetchDataService.getInsiderSentimentData(this.stockSymbol).subscribe({
      next: (data) => {
        this.data = data;
        this.data = this.data.data;
        this.data = this.data.slice(-3);
        this.dataLoaded = true;
      },
    });
  }
}
