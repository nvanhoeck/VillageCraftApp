import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ButtonComponent} from "../shared/button";
import {GamePhase} from "../../query/model/game-card-vo";
import {map} from "rxjs";
import {GamePhaseFacadeService} from "../../facades/game-phase-facade.service";

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

  endTurnLabel$ = this.gamePhaseFacade.getGamePhase$(this.gameFacade.getGameId()).pipe(map((gamePhase) => this.mapEndTurnLabelByGamePhase(gamePhase)));
  showEndTurn$ = this.gamePhaseFacade.getGamePhase$(this.gameFacade.getGameId()).pipe(map((gamePhase) => this.mapShowEndTurnByPhase(gamePhase)));

  constructor(private gameFacade: GameFacadeService, private gamePhaseFacade: GamePhaseFacadeService) {
  }


  handleEndTurnClicked($event: Event) {
    this.gameFacade.endTurn()
  }

  private mapShowEndTurnByPhase(gamePhase: GamePhase) {
    switch (gamePhase) {
      case "setup":
      case "mulligan":
      case "draw":
        return false
      case "production":
      case "action":
      case "combat":
      case "refresh":
      case "consumption":
      case "end_turn":
        return true
    }
  }

  private mapEndTurnLabelByGamePhase(gamePhase: GamePhase) {
    switch (gamePhase) {
      case "setup":
      case "mulligan":
      case "draw":
        return ""
      case "production":
        return "End production phase"
      case "action":
        return "End action phase"
      case "combat":
        return "End combat phase"
      case "refresh":
        return "End refresh phase"
      case "consumption":
        return "End consumption phase"
      case "end_turn":
        return "End turn"
    }
  }
}
