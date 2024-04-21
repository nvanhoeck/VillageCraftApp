import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ButtonComponent} from "../shared/button";

@Component({
  selector: 'app-player-interface',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './player-interface.component.html',
  styleUrl: './player-interface.component.scss'
})
export class PlayerInterfaceComponent {
  wood$ = this.gameFacade.getWood$()
  food$ = this.gameFacade.getFood$()


  constructor(private gameFacade: GameFacadeService) {
  }
}
