import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home";
import {CardsOverviewComponent} from "./components/cards-overview";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'overview', component: CardsOverviewComponent },
  { path: '**', component: HomeComponent },
];
