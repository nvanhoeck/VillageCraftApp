import {GameEvent} from './gameEvent'
import {PlayerType} from "../../domain/player-type";

export class PlayerCreatedEvent implements GameEvent{
  private _payload : {
     id: string
     playerType: PlayerType
  }
  private _guid: string;
  private _timestamp: Date;
  private _version: number;
  private readonly _type = 'PlayerCreated'

  constructor() {
    this._payload = {
      id: 'unknown',
      playerType: "PC"
    }
    this._version = -1
    this._guid = 'unknown'
    this._timestamp = new Date()
  }

  public apply(id: string, playerType: PlayerType) {
    this._payload = {
      id: id,
      playerType: playerType
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
