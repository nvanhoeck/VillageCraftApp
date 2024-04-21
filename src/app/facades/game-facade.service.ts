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
import {ShouldShowSlotsForPlayerUseCaseService} from "../use-case/should-show-slots-for-player-use-case.service";
import {PlayerSelectSlotsForCardUseCaseService} from "../use-case/player-select-slots-for-card-use-case.service";
import {GetPlayerResourceUseCaseService} from "../use-case/get-player-resource-use-case.service";
import {combineLatest, defaultIfEmpty, map, Observable, of} from "rxjs";
import {CardAction, GameCardVO, GamePhase, Trigger, TRIGGER_FROM_GAME_SPACE} from "../query/model/game-card-vo";
import {GamePhaseFacadeService} from "./game-phase-facade.service";
import {GameSpace} from "../query/model/game-space";
import {TriggerCardEffectUseCaseService} from "../use-case/trigger-card-effect-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {
  private playerId = 'niko';
  private gameId = this.gameSetupFacade.getGameId();

  constructor(private gameSetupFacade: GameSetupFacadeService,
              private gamePhaseFacade: GamePhaseFacadeService,
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
              private playCardFromUseCaseService: PlayCardFromToUseCaseService,
              private triggerCardEffectUseCaseService: TriggerCardEffectUseCaseService,
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
    this.playCardFromUseCaseService.playCardFromTo(from, to, cardId, this.playerId, this.gameId!)
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

  getFood$() {
    return this.getPlayerResourceUseCaseService.getPlayerResources$(this.gameId!, this.playerId).pipe(map((resources) => resources.food))
  }

  getCurrentPhase$() {
    return this.gamePhaseFacade.getGamePhase$(this.gameId!);
  }

  exhaustCard(gameSpace: GameSpace, cardId: string) {
    this.triggerCardEffectUseCaseService.exhaustCard(gameSpace, cardId, this.gamePhaseFacade.getGamePhase(this.gameId!), this.gameId!, this.playerId)
  }

  getCard$(id: string, gameSpace?: GameSpace) {
    switch (gameSpace) {
      case 'BUILDING_LANE':
        return this.getPlayerBuildingLane$().pipe(map(lane => lane.findCardInLane(id)));
      case 'CITIZEN_LANE':
        return this.getPlayerCitizenLane$().pipe(map(lane => lane.findCardInLane(id)));
      case 'SETTLEMENT':
        return this.getSettlement$();
      case 'HAND':
        return this.getPlayerHand$().pipe((map(hand => hand.find((card) => card.id === id))));
      //TODO improve
      case undefined:
        return this.getPlayerHand$().pipe((map(hand => hand.find((card) => card.id === id))));
      default:
        throw new Error(`case ${gameSpace} not defined to fetch card, built code for it`)
    }
  }

  gainWood(gameSpace: GameSpace, cardId: string) {
    this.triggerCardEffectUseCaseService.gainWood(gameSpace, cardId, this.gamePhaseFacade.getGamePhase(this.gameId!), this.gameId!, this.playerId)
  }

  gainFood(gameSpace: GameSpace, cardId: string) {
    this.triggerCardEffectUseCaseService.gainFood(gameSpace, cardId, this.gamePhaseFacade.getGamePhase(this.gameId!), this.gameId!, this.playerId)
  }

  private triggerAreAllowedFromGameSpace(trigger: Trigger, gameSpace: GameSpace) {
    return TRIGGER_FROM_GAME_SPACE[trigger].includes(gameSpace)
  }

  getGameId() {
    return this.gameId!;
  }

  endTurn() {
    this.gamePhaseFacade.endPhase(this.gameId!, this.playerId)
  }

  playFromHandIsAllowed$(gameCardVO: GameCardVO): Observable<boolean> {
    if (gameCardVO.cardType === 'building') {
      return this.getPlayerResourceUseCaseService.getPlayerResources$(this.gameId!, this.playerId).pipe(defaultIfEmpty({
        wood: 0,
        food: 0
      }), map((resources) => {
        return (resources.wood >= (gameCardVO.cost?.wood ?? 0)) && (resources.food >= (gameCardVO.cost?.food ?? 0))
      }))
    } else return of(true)
  }

  getAllowedActions$(cardID: string, gameSpace: GameSpace ) {
    return combineLatest([
      this.getCard$(cardID, gameSpace),
      this.gamePhaseFacade.getGamePhase$(this.gameId!),
      this.getPlayerResourceUseCaseService.getPlayerResources$(this.gameId!, this.playerId)
    ]).pipe(map(([card, gamePhase, playerResources]) => {
      if(card) {
        return card.actions.filter((action) => this.isActionAllowed(action, card, gameSpace, gamePhase, playerResources))
      } else {
        return []
      }
    }))
  }

  private isActionAllowed(action: CardAction, card: GameCardVO, gameSpace: GameSpace, gamePhase: GamePhase, playerResources: {wood: number, food: number}) {
    if(card.cardId === "20") {
      debugger
    }
    switch (action.trigger) {
      case "destruction":
        return false;
      case "exhaust":
        return  !card.exhausted && ['BUILDING_LANE', 'CITIZEN_LANE'].includes(gameSpace) && gamePhase === 'action';
      case "deploy":
        return gameSpace === 'HAND'  && gamePhase === 'action';
      case "condition":
        return true
      case "banish":
        return ['BUILDING_LANE', 'CITIZEN_LANE', 'HAND'].includes(gameSpace)  && gamePhase === 'action';
      case "claim":
        return !card.exhausted &&  ['BUILDING_LANE', 'CITIZEN_LANE', 'HAND'].includes(gameSpace)  && gamePhase === 'action';
      case "gainFood":
        debugger
        return !card.exhausted && ['BUILDING_LANE', 'CITIZEN_LANE'].includes(gameSpace) && gamePhase === 'production';
      case "build":
        return !card.exhausted && ['BUILDING_LANE', 'CITIZEN_LANE'].includes(gameSpace) && gamePhase === 'action';
      case "gainWood":
        debugger
        return !card.exhausted && ['BUILDING_LANE', 'CITIZEN_LANE'].includes(gameSpace)  && gamePhase === 'production';
      case "gainFoodAndWood":
        return !card.exhausted && ['BUILDING_LANE', 'CITIZEN_LANE'].includes(gameSpace)  && gamePhase === 'production';
      case "archive":
        return gameSpace === 'HAND'
      case "info":
        return true
    }
  }
}
