import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsJsonReaderAdapterService} from "./game-cards-json-reader-adapter.service";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    GameCardsJsonReaderAdapterService
  ]
})
export class AdaptersModule { }
