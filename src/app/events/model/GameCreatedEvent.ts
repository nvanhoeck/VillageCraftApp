import {GameType} from "../../domain/game-type";
import {Event} from './event'
export class GameCreatedEvent implements Event{
  private payload : {
     id: string
     gameType: GameType
  }
  private guid: string;
  private timestamp: Date;
  private version: number;

  constructor() {
  }

  public apply(id: string, gameType: GameType) {
    this.payload = {
      id: id,
      gameType: gameType
    }
    this.guid = '1' //TODO new v4 guid
    this.timestamp = new Date()
    this.version = 0
  }

}
