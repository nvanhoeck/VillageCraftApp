import {Injectable} from '@angular/core';
import {EventBusService} from "../../events/event-bus.service";
import {EventHandler} from "../../events/event-handler";
import {GameEvent} from "../../events/model/gameEvent";
import {GameCreatedEvent} from "../../events";
import {PlayerBaseDecksLoadedEvent} from "../../events/model/PlayerBaseDecksLoadedEvent";
import {PlayerCreatedEvent} from "../../events/model/PlayerCreatedEvent";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {Game} from "../model/game";
import {Player} from "../model/player";
import {BehaviorSubject, EMPTY, map, take} from "rxjs";
import {CardPlayerFromHandEvent} from "../../events/model/CardPlayedFromHandEvent";
import {CardPlayedToArchiveEvent} from "../../events/model/CardPlayedToArchiveEvent";
import {DisplayCitizenLanePlaySlotsEvent} from "../../events/model/DisplayCitizenLanePlaySlotsEvent";
import {CardPlayedToBuildingLaneEvent} from "../../events/model/CardPlayedToBuildingLaneEvent";
import {CardPlayedToCitizenLaneEvent} from "../../events/model/CardPlayedToCitizenLaneEvent";
import {HideBuildingLanePlaySlotsEvent} from "../../events/model/HideBuildingLanePlaySlotsEvent";
import {HideCitizenLanePlaySlotsEvent} from "../../events/model/HideCitizenLanePlaySlotsEvent";
import {MulliganPhaseStartedEvent} from "../../events/model/MulliganPhaseStartedEvent";
import {PlayerMulliganedEvent} from "../../events/model/PlayerMulliganed";
import {GameInitiatedEvent} from "../../events/model/GameInitiatedEvent";
import {CardExhaustedEvent} from "../../events/model/CardExhaustedEvent";
import {PlayerGainedFoodEvent} from "../../events/model/PlayerGainedFoodEvent";

@Injectable({
  providedIn: 'root'
})
export class GameProjectionService implements EventHandler {

  private games: { [key: string]: BehaviorSubject<Game> }
  private players: { [key: string]: BehaviorSubject<Player> }

  constructor(private readonly eventBus: EventBusService,
              private readonly errorMessageService: MessagesAdapterService) {
    this.games = {}
    this.players = {}
    this.eventBus.registerHandler('GameCreated', this)
    this.eventBus.registerHandler('PlayerCreated', this)
    this.eventBus.registerHandler('PlayerBaseDecksLoaded', this)
    this.eventBus.registerHandler('CardPlayedToArchiveEvent', this)
    this.eventBus.registerHandler('CardPlayerFromHand', this)
    this.eventBus.registerHandler('DisplayCitizenLanePlaySlots', this)
    this.eventBus.registerHandler('HideCitizenLanePlaySlots', this)
    this.eventBus.registerHandler('DisplayBuildingLanePlaySlots', this)
    this.eventBus.registerHandler('HideBuildingLanePlaySlots', this)
    this.eventBus.registerHandler('CardPlayedToBuildingLane', this)
    this.eventBus.registerHandler('CardPlayedToCitizenLane', this)
    this.eventBus.registerHandler('MulliganPhaseStarted', this)
    this.eventBus.registerHandler('PlayerMulliganed', this)
    this.eventBus.registerHandler('GameInitiated', this)
    this.eventBus.registerHandler('CardExhausted', this)
    this.eventBus.registerHandler('PlayerGainedFood', this)
  }

  execute(event: GameEvent): void {
    switch (event.type) {
      case 'GameCreated':
        this.handleGameCreatedEvent(event);
        break;
      case 'PlayerCreated':
        this.handlePlayerCreatedEvent(event);
        break;
      case 'PlayerBaseDecksLoaded':
        this.handlePlayerBaseDecksLoadedEvent(event);
        break;
      case 'CardPlayedToArchiveEvent':
        this.handleCardPlayerToArchive(event);
        break;
      case 'CardPlayerFromHand':
        this.handleCardPlayedFromHandEvent(event);
        break;
      case 'DisplayCitizenLanePlaySlots':
        this.handleDisplayCitizenLanePlaySlots(event);
        break;
      case 'DisplayBuildingLanePlaySlots':
        this.handleDisplayBuildingLanePlaySlots(event);
        break;
      case 'HideCitizenLanePlaySlots':
        this.handleHideCitizenLanePlaySlots(event);
        break;
      case 'HideBuildingLanePlaySlots':
        this.handleHideBuildingLanePlaySlots(event);
        break;
      case 'CardPlayedToBuildingLane':
        this.handleCardPlayedToBuildingLane(event);
        break;
      case 'CardPlayedToCitizenLane':
        this.handleCardPlayedToCitizenLane(event);
        break;
      case 'MulliganPhaseStarted':
        this.handleMulliganPhaseStarted(event);
        break;
      case 'PlayerMulliganed':
        this.playerMulliganed(event)
        break;
      case 'GameInitiated':
        this.handleGameInitiated(event)
        break;
       case 'CardExhausted':
        this.handleCardExhausted(event)
        break;
      case 'PlayerGainedFood':
        this.handlePlayerGainedFood(event)
        break;
      default:
        this.errorMessageService.publish({
          topic: "APPLICATION-ERROR",
          level: "ERROR",
          message: `Could not find event handler for ${event.type} at game-projection service`
        })
    }
  }

  getPlayerIds$(gameId: string) {
    if (this.games[gameId]) {
      return this.games[gameId].pipe(map((game) => game.players))
    } else {
      this.errorMessageService.publish({
        topic: "APPLICATION-ERROR",
        level: "ERROR",
        message: `Could not find players for ${gameId} at game-projection service`
      })
      return EMPTY
    }
  }


  getPlayer$(playerId: string) {
    if (this.players[playerId]) {
      return this.players[playerId].asObservable()
    } else {
      this.errorMessageService.publish({
        topic: "APPLICATION-ERROR",
        level: "ERROR",
        message: `Could not find player for ${playerId} at game-projection service`
      })
      return EMPTY
    }
  }

  getGame$(gameId: string) {
    return this.games[gameId].asObservable()
  }

  shouldShowCitizenSlotFor$(playerId: string, gameId: string) {
    return this.games[gameId].pipe(map((game) => game.players.find((playerInfo) => playerInfo?.id === playerId)?.shouldShowCitizenSlot() ?? false))
  }

  shouldShowBuildingSlotFor$(playerId: string, gameId: string) {
    return this.games[gameId].pipe(map((game) => game.players.find((playerInfo) => playerInfo?.id === playerId)?.shouldShowBuildingSlot() ?? false))
  }

  getGamePhase$(gameId: string) {
    return this.games[gameId].pipe(map((game) => game.gameStatus))
  }

  getPlayerResources$(gameId: string, playerId: string) {
    return this.players[playerId].pipe(map((player) => player.getResources()))
  }

  private handleGameCreatedEvent(event: GameCreatedEvent) {
    this.games[event.payload.id] = new BehaviorSubject<Game>(new Game(event.payload.id, event.payload.type))
  }

  private handlePlayerBaseDecksLoadedEvent(event: PlayerBaseDecksLoadedEvent) {
    this.players[event.payload.player.id].pipe(take(1)).subscribe((player) => {
      player.updateSettlement(event.payload.player.findSettlement())
      player.updateCitizenLane(event.payload.player.findCitizenLane())
      player.updateDeck(event.payload.player.findDeck())
      player.updateDiscardPile(event.payload.player.findDiscardPile())
      player.updateBanishment(event.payload.player.findBanishment())
      player.updateGraveyard(event.payload.player.findGraveyard())
      player.updateHand(event.payload.player.findHand())
      player.updateArchive(event.payload.player.findArchive())
      player.updateBuildingLane(event.payload.player.findBuildingLane())
      this.players[event.payload.player.id].next(player)
    })

  }

  private handlePlayerCreatedEvent(event: PlayerCreatedEvent) {
    this.players[event.payload.id] = new BehaviorSubject<Player>(new Player(event.payload.id, event.payload.playerType))
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.handlePlayerAdded(event.payload.id)
      this.games[event.payload.gameId].next(game)
    })


  }

  private handleCardPlayedFromHandEvent(event: CardPlayerFromHandEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.updateHand(event.payload.playerHand)
      this.players[event.payload.playerId].next(player)
    })
  }

  private handleCardPlayerToArchive(event: CardPlayedToArchiveEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.updateArchive(event.payload.archive)
      this.players[event.payload.playerId].next(player)
    })
  }

  private handleDisplayCitizenLanePlaySlots(event: DisplayCitizenLanePlaySlotsEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.players.find((player) => player.id === event.payload.playerId)?.showCitizenSlot()
      this.games[event.payload.gameId].next(game)
    })
  }

  private handleDisplayBuildingLanePlaySlots(event: GameEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.players.find((player) => player.id === event.payload.playerId)?.showBuildingSlot()
      this.games[event.payload.gameId].next(game)
    })
  }

  private handleCardPlayedToBuildingLane(event: CardPlayedToBuildingLaneEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.updateBuildingLane(event.payload.buildingLane)
      this.players[event.payload.playerId].next(player)
    })
  }

  private handleCardPlayedToCitizenLane(event: CardPlayedToCitizenLaneEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.updateCitizenLane(event.payload.citizenLane)
      this.players[event.payload.playerId].next(player)
    })
  }

  private handleHideBuildingLanePlaySlots(event: HideBuildingLanePlaySlotsEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.players.find((player) => player.id === event.payload.playerId)?.hideBuildingSlot()
      this.games[event.payload.gameId].next(game)
    })
  }

  private handleHideCitizenLanePlaySlots(event: HideCitizenLanePlaySlotsEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.players.find((player) => player.id === event.payload.playerId)?.hideCitizenSlot()
      this.games[event.payload.gameId].next(game)
    })
  }

  private handleMulliganPhaseStarted(event: MulliganPhaseStartedEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.startMulliganPhase()
      this.games[event.payload.gameId].next(game)
    })
  }

  private playerMulliganed(event: PlayerMulliganedEvent) {
    this.players[event.payload.player.id].pipe(take(1)).subscribe((player) => {
      player.updateHand(event.payload.player.findHand())
      player.updateDeck(event.payload.player.findDeck())
      this.players[event.payload.player.id].next(player)
    })
  }

  private handleGameInitiated(event: GameInitiatedEvent) {
    this.games[event.payload.gameId].pipe(take(1)).subscribe((game) => {
      game.startProductionPhase()
      this.games[event.payload.gameId].next(game)
    })
  }

  getGamePhase(gameId: string) {
    return this.games[gameId].value.gameStatus
  }

  private handleCardExhausted(event: CardExhaustedEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.exhaustCard(event.payload.cardId, event.payload.gameSpace)
      this.players[event.payload.playerId].next(player)
    })
  }

  private handlePlayerGainedFood(event: PlayerGainedFoodEvent) {
    this.players[event.payload.playerId].pipe(take(1)).subscribe((player) => {
      player.addFood(event.payload.amount)
      this.players[event.payload.playerId].next(player)
    })
  }
}
