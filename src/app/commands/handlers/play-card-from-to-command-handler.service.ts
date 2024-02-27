import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {isPlayCardFromToCommand, PlayCardFromToCommand} from "../model/play-card-from-to-command";
import {CardPlayedToArchiveEvent} from "../../events/model/CardPlayedToArchiveEvent";
import {CardPlayerFromHandEvent} from "../../events/model/CardPlayedFromHandEvent";
import {Game} from "../../domain/game";
import {CardPlayedToCitizenLaneEvent} from "../../events/model/CardPlayedToCitizenLaneEvent";
import {CardPlayedToBuildingLaneEvent} from "../../events/model/CardPlayedToBuildingLaneEvent";

@Injectable({
  providedIn: 'root'
})
export class PlayCardFromToCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService,
  ) {
    commandBus.registerHandler('PlayCardFromTo', this)
  }

  execute(cmd: Command): void {
    if (isPlayCardFromToCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      switch (cmd.payload.from) {
        case "HAND":
          this.handleFromHandCommands(game, cmd);
          break;
        default:
          this.errorMessageService.publish({
            level: 'ERROR',
            message: `No suitable logic found for ${cmd.payload.from} and ${cmd.payload.to} in PlayCardFromToCommandHandlerService for ${cmd.type}`,
            topic: "APPLICATION-ERROR"
          })
      }
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for PlayCardFromToCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }

  private handleFromHandCommands(game: Game, cmd: PlayCardFromToCommand) {
    switch (cmd.payload.to) {
      case "CITIZEN_LANE":
        this.handlePlayCardFromHandToLane(game, cmd);
        break;
      case "BUILDING_LANE":
        this.handlePlayCardFromHandToLane(game, cmd);
        break;
      case "ARCHIVE":
        this.handlePlayCardFromHandToArchive(game, cmd);
        break;
      default:
        this.errorMessageService.publish({
          level: 'ERROR',
          message: `No suitable logic found for ${cmd.payload.from} and ${cmd.payload.to} in PlayCardFromToCommandHandlerService for ${cmd.type}`,
          topic: "APPLICATION-ERROR"
        })
    }
  }

  private handlePlayCardFromHandToArchive(game: Game, cmd: PlayCardFromToCommand) {
    const foundPlayer = game.players.find((player) => player.id === cmd.payload.playerId);
    if (!foundPlayer) return //TODO
    foundPlayer.playCardFromHandToArchive(cmd.payload.cardId);
    const hand = foundPlayer?.findHand();
    const archive = foundPlayer?.findArchive();
    this.eventBus.on(new CardPlayerFromHandEvent({
      playerHand: hand!,
      playerId: cmd.payload.playerId,
      gameId: cmd.payload.gameId
    }))
    this.eventBus.on(new CardPlayedToArchiveEvent({
      archive: archive!,
      playerId: cmd.payload.playerId,
      gameId: cmd.payload.gameId
    }))
  }

  private handlePlayCardFromHandToLane(game: Game, cmd: PlayCardFromToCommand) {
    const foundPlayer = game.players.find((player) => player.id === cmd.payload.playerId);
    if (!foundPlayer) return // TODO
    if (cmd.payload.to === 'CITIZEN_LANE') {
      foundPlayer.playCardFromHandToCitizenLaneAtSlot(cmd.payload.cardId, cmd.payload.index)
      const hand = foundPlayer?.findHand();
      this.eventBus.on(new CardPlayerFromHandEvent({
        playerHand: hand!,
        playerId: cmd.payload.playerId,
        gameId: cmd.payload.gameId
      }))
      this.eventBus.on(new CardPlayedToCitizenLaneEvent({
        citizenLane: foundPlayer.findCitizenLane(),
        playerId: cmd.payload.playerId,
        gameId: cmd.payload.gameId
      }))
    } else {
      foundPlayer.playCardFromHandToBuildingLaneAtSlot(cmd.payload.cardId, cmd.payload.index)
      const hand = foundPlayer?.findHand();
      this.eventBus.on(new CardPlayerFromHandEvent({
        playerHand: hand!,
        playerId: cmd.payload.playerId,
        gameId: cmd.payload.gameId
      }))
      this.eventBus.on(new CardPlayedToBuildingLaneEvent({
        buildingLane: foundPlayer.findBuildingLane(),
        playerId: cmd.payload.playerId,
        gameId: cmd.payload.gameId
      }))
    }


  }
}
