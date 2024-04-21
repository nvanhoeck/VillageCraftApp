import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameSetupFacadeService} from "../../facades/game-setup.facade.service";
import {SettlementComponent} from "../settlement/settlement.component";
import {PlayerHandComponent} from "../player-hand/player-hand.component";
import {PlayerDeckComponent} from "../player-deck/player-deck.component";
import {ArchiveComponent} from "../archive/archive.component";
import {CitizenLaneComponent} from "../citizen-lane/citizen-lane.component";
import {BuildingLaneComponent} from "../building-lane/building-lane.component";
import {DragScrollComponent, DragScrollItemDirective} from "ngx-drag-scroll";
import {DiscardPileComponent} from "../discard-pile/discard-pile.component";
import {BanishmentComponent} from "../banishment/banishment.component";
import {GraveyardComponent} from "../graveyard/graveyard.component";
import {GamePhaseFacadeService} from "../../facades/game-phase-facade.service";
import {map, switchMap} from "rxjs";
import {ButtonComponent} from "../shared/button";
import {PlayerInterfaceComponent} from "../player-interface/player-interface.component";
import {GameFacadeService} from "../../facades/game-facade.service";
import {GamePhase} from "../../query/model/game-card-vo";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, SettlementComponent, PlayerHandComponent, PlayerDeckComponent, ArchiveComponent,
    CitizenLaneComponent, BuildingLaneComponent, DragScrollComponent, DragScrollItemDirective, DiscardPileComponent,
    BanishmentComponent, GraveyardComponent, ButtonComponent, PlayerInterfaceComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game$ = this.gameSetupFacade.getGame$()
  playersIds$ = this.gameSetupFacade.getPlayerIds$()
  gamePhase$ = this.game$.pipe(map((game) => game.id), switchMap((gameId: string) => {
    return this.gamePhaseFacade.getGamePhase$(gameId)
  }))

  endTurnLabel$ = this.gamePhaseFacade.getGamePhase$(this.gameFacade.getGameId()).pipe(map((gamePhase) => this.mapEndTurnLabelByGamePhase(gamePhase)));
  showEndTurn$ = this.gamePhaseFacade.getGamePhase$(this.gameFacade.getGameId()).pipe(map((gamePhase) => this.mapShowEndTurnByPhase(gamePhase)));

  mulliganCardsSelected: string[] = []

  constructor(private readonly gameSetupFacade: GameSetupFacadeService, private gameFacade: GameFacadeService, private readonly gamePhaseFacade: GamePhaseFacadeService) {

  }

  handleMulliganCardClicked(cardId: string) {
    const cardAlreadyFound = this.mulliganCardsSelected.find((id) => id === cardId);
    if (cardAlreadyFound) {
      this.mulliganCardsSelected.splice(this.mulliganCardsSelected.indexOf(cardAlreadyFound), 1)
    } else {
      this.mulliganCardsSelected.push(cardId)
    }
  }

  mulliganCardsSelect() {
    this.gameSetupFacade.selectCardsForPlayer(this.mulliganCardsSelected)
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
