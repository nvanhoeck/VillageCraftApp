import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home";
import {CardsOverviewComponent} from "./components/cards-overview";
import {GameComponent} from "./components/game/game.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'overview', component: CardsOverviewComponent },
  { path: '1-vs-pc', component: GameComponent },
  { path: '**', component: HomeComponent },
];
