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
import {BehaviorSubject, EMPTY, take} from "rxjs";

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
      default:
        this.errorMessageService.publish({
          topic: "APPLICATION-ERROR",
          level: "ERROR",
          message: `Could not find event handler for ${event.type} at game-projection service`
        })
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
      player.updateHand(event.payload.player.findHand())
      player.updateArchive(event.payload.player.findArchive())
      player.updateBuildingLane(event.payload.player.findBuildingLane())
      this.players[event.payload.player.id].next(player)
    })

  }

  private handlePlayerCreatedEvent(event: PlayerCreatedEvent) {
    console.log(event.payload.id)
    this.players[event.payload.id] = new BehaviorSubject<Player>(new Player(event.payload.id, event.payload.playerType))
  }
}
