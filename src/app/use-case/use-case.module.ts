import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdaptersModule} from "../adapters/adapters.module";
import {CardsUseCaseService} from "./cards-use-case.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdaptersModule
  ],
  providers: [
    CardsUseCaseService
  ]
})
export class UseCaseModule { }
