import {GameType} from "../../domain/game-type";
import {GameEvent} from './gameEvent'
export class GameCreatedEvent implements GameEvent{
  private _payload : {
     id: string
     gameType: GameType
  }
  private _guid: string;
  private _timestamp: Date;
  private _version: number;
  private readonly _type = 'GameCreated'

  constructor() {
    this._payload = {
      id: 'unknown',
      gameType: "PVC"
    }
    this._version = -1
    this._guid = 'unknown'
    this._timestamp = new Date()
  }

  public apply(id: string, gameType: GameType) {
    this._payload = {
      id: id,
      gameType: gameType
    }
    this._guid = '1' //TODO new v4 guid
    this._timestamp = new Date()
    this._version = 0
  }

  public get payload () {
    return this._payload
  }

  public get guid () {
    return this._guid
  }

  public get timestamp () {
    return this._timestamp
  }

  public get version () {
    return this._version
  }

  public get type () {
    return this._type
  }


}