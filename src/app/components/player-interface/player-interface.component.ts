import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-player-interface',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './player-interface.component.html',
  styleUrl: './player-interface.component.scss'
})
export class PlayerInterfaceComponent {
  wood$ = this.gameFacade.getWood$()
  grain$ = this.gameFacade.getGrain$()


  constructor(private gameFacade: GameFacadeService) {
  }
}
