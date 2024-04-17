import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(protected readonly router: Router) {
  }

  redirectToCardsOverview = async () => {
    await this.router.navigate(['/overview'])
  };
  redirectToPlayerVsPCOverview = async () => {
    await this.router.navigate(['/1-vs-pc'])
  };

}
