import {Injectable} from '@angular/core';
import {GetSettlementUseCaseService} from "../use-case/get-settlement-use-case.service";
import {GetPlayerHandUseCaseService} from "../use-case/get-player-hand-use-case.service";
import {GetPlayerDeckUseCaseService} from "../use-case/get-player-deck-use-case.service";
import {GetPlayerArchiveUseCaseService} from "../use-case/get-player-archive-use-case.service";
import {GetPlayerBuildingLaneUseCaseService} from "../use-case/get-player-building-lane-use-case.service";
import {GetPlayerCitizenLaneUseCaseService} from "../use-case/get-player-citizen-lane-use-case.service";
import {GetPlayerDiscardPileUseCaseService} from "../use-case/get-player-discard-pile-use-case.service";
import {GetPlayerGraveyardUseCaseService} from "../use-case/get-player-graveyard-use-case.service";
import {GetPlayerBanishmentUseCaseService} from "../use-case/get-player-banishment-use-case.service";
import {PlayCardFromToUseCaseService} from "../use-case/play-card-from-to-use-case.service";
import {GameSetupFacadeService} from "./game-setup.facade.service";
import {GameSpace} from "../domain/game-space";
import {ShouldShowSlotsForPlayerUseCaseService} from "../use-case/should-show-slots-for-player-use-case.service";
import {PlayerSelectSlotsForCardUseCaseService} from "../use-case/player-select-slots-for-card-use-case.service";
import {GetPlayerResourceUseCaseService} from "../use-case/get-player-resource-use-case.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {
  private playerId = 'niko';
  private gameId = this.gameSetupFacade.getGameId();

  constructor(private gameSetupFacade: GameSetupFacadeService,
              private getSettlementUseCase: GetSettlementUseCaseService,
              private getPlayerHandUseCase: GetPlayerHandUseCaseService,
              private getPlayerDeckUseCase: GetPlayerDeckUseCaseService,
              private getPlayerArchiveUseCase: GetPlayerArchiveUseCaseService,
              private getPlayerBuildingLaneUseCase: GetPlayerBuildingLaneUseCaseService,
              private getPlayerCitizenLaneUseCase: GetPlayerCitizenLaneUseCaseService,
              private getPlayerDiscardPileUseCaseService: GetPlayerDiscardPileUseCaseService,
              private getPlayerGraveyardUseCaseService: GetPlayerGraveyardUseCaseService,
              private getPlayerBanishmentUseCaseService: GetPlayerBanishmentUseCaseService,
              private shouldShowSlotsForPlayerUseCaseService: ShouldShowSlotsForPlayerUseCaseService,
              private playerSelectSlotsForCardUseCaseService: PlayerSelectSlotsForCardUseCaseService,
              private playerCardFromUseCaseService: PlayCardFromToUseCaseService,
              private getPlayerResourceUseCaseService: GetPlayerResourceUseCaseService
  ) {
  }

  public getSettlement$() {
    return this.getSettlementUseCase.getSettlement$(this.playerId)
  }

  getPlayerHand$() {
    return this.getPlayerHandUseCase.getPlayerHand$(this.playerId)
  }

  getPlayerDeck$() {
    return this.getPlayerDeckUseCase.getPlayerDeck$(this.playerId)
  }

  getPlayerArchive$() {
    return this.getPlayerArchiveUseCase.getPlayerArchive$(this.playerId)
  }

  getPlayerBuildingLane$() {
    return this.getPlayerBuildingLaneUseCase.getPlayerBuildingLane$(this.playerId)
  }

  getPlayerCitizenLane$() {
    return this.getPlayerCitizenLaneUseCase.getPlayerCitizenLane$(this.playerId)
  }


  getPlayerDiscardPile$() {
    return this.getPlayerDiscardPileUseCaseService.getPlayerDiscardPile$(this.playerId)
  }

  getPlayerGraveyard$() {
    return this.getPlayerGraveyardUseCaseService.getPlayerGraveyard$(this.playerId)

  }

  getPlayerBanishment$() {
    return this.getPlayerBanishmentUseCaseService.getPlayerBanishment$(this.playerId)

  }

  playCardFromTo(from: GameSpace, to: GameSpace, cardId: string) {
    this.playerCardFromUseCaseService.playCardFromTo(from, to, cardId, this.playerId, this.gameId!)
  }

  showSlots$(slotType: 'citizen' | 'building') {
    if (slotType === 'citizen') {
      return this.shouldShowSlotsForPlayerUseCaseService.shouldShowCitizenSlotsForPlayer$(this.playerId, this.gameId!)
    } else {
      return this.shouldShowSlotsForPlayerUseCaseService.shouldShowBuildingSlotsForPlayer$(this.playerId, this.gameId!)
    }
  }

  citizenSlotSelected(index: number) {
    this.playerSelectSlotsForCardUseCaseService.selectCitizenLaneSlot(index, this.gameId!, this.playerId)
  }

  buildingSlotSelected(index: number) {
    this.playerSelectSlotsForCardUseCaseService.selectBuilingLaneSlot(index, this.gameId!, this.playerId)
  }

  getWood$() {
    return this.getPlayerResourceUseCaseService.getPlayerResources$(this.gameId!, this.playerId).pipe(map((resources) => resources.wood))
  }

  getGrain$() {
    return this.getPlayerResourceUseCaseService.getPlayerResources$(this.gameId!, this.playerId).pipe(map((resources) => resources.grain))
  }
}
