import {Component, DestroyRef, inject} from '@angular/core';
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
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LocationCardComponent} from "../location-card/location-card.component";
import {LocationLaneComponent} from "../location-lane/location-lane.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, SettlementComponent, PlayerHandComponent, PlayerDeckComponent, ArchiveComponent,
    CitizenLaneComponent, BuildingLaneComponent, DragScrollComponent, DragScrollItemDirective, DiscardPileComponent,
    BanishmentComponent, GraveyardComponent, ButtonComponent, PlayerInterfaceComponent, LocationCardComponent, LocationLaneComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  private destroyRef = inject(DestroyRef);

  game$ = this.gameSetupFacade.getGame$().pipe(takeUntilDestroyed(this.destroyRef))
  playersIds$ = this.gameSetupFacade.getPlayerIds$().pipe(takeUntilDestroyed(this.destroyRef))
  gamePhase$ = this.game$.pipe(takeUntilDestroyed(this.destroyRef),map((game) => game.id), switchMap((gameId: string) => {
    return this.gamePhaseFacade.getGamePhase$(gameId)
  }))


  mulliganCardsSelected: string[] = []

  constructor(private readonly gameSetupFacade: GameSetupFacadeService, private readonly gamePhaseFacade: GamePhaseFacadeService) {

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

}
