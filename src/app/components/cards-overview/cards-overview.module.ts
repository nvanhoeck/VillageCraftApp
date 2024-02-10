import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardsOverviewComponent} from "./cards-overview.component";



@NgModule({
  declarations: [CardsOverviewComponent],
  exports: [CardsOverviewComponent],
  imports: [
    CommonModule
  ]
})
export class CardsOverviewModule { }
