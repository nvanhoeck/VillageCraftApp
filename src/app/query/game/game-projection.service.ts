import {Injectable} from '@angular/core';
import {EventBusService} from "../../events/event-bus.service";
import {EventHandler} from "../../events/event-handler";
import {GameEvent} from "../../events/model/gameEvent";
import {GameCreatedEvent} from "../../events";
import {PlayerBaseDecksLoadedEvent} from "../../events/model/PlayerBaseDecksLoadedEvent";
import {PlayerCreatedEvent} from "../../events/model/PlayerCreatedEvent";
import {ErrorMessagesAdapterService} from "../../adapters/events/error-messages-adapter.service";
import {Game} from "../model/game";
import {Player} from "../model/player";
import {BehaviorSubject, EMPTY, map, take} from "rxjs";
import {CardPlayerFromHandEvent} from "../../events/model/CardPlayedFromHandEvent";
import {CardPlayedToArchiveEvent} from "../../events/model/CardPlayedToArchiveEvent";

@Injectable({
  providedIn: 'root'
})
export class GameProjectionService implements EventHandler {

  private games: { [key: string]: BehaviorSubject<Game> }
  private players: { [key: string]: BehaviorSubject<Player> }

  constructor(private readonly eventBus: EventBusService,
              private readonly errorMessageService: ErrorMessagesAdapterService) {
    this.games = {}
    this.players = {}
    this.eventBus.registerHandler('GameCreated', this)
    this.eventBus.registerHandler('PlayerCreated', this)
    this.eventBus.registerHandler('PlayerBaseDecksLoaded', this)
    this.eventBus.registerHandler('CardPlayedToArchiveEvent', this)
    this.eventBus.registerHandler('CardPlayerFromHand', this)
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
}
