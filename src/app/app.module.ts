import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SentimentComponent } from './sentiment/sentiment.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    StockListComponent,
    SentimentComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
