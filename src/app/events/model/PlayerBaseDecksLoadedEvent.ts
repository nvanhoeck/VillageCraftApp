import {GameEvent} from './gameEvent'
import {Player} from "../../domain/player";

export class PlayerBaseDecksLoadedEvent implements GameEvent {
  private readonly _type = 'PlayerBaseDecksLoaded'

  constructor() {
    this._payload = new Player()
    this._version = -1
    this._guid = 'unknown'
    this._timestamp = new Date()
  }

  private _payload: Player

  public get payload() {
    return this._payload
  }

  private _guid: string;

  public get guid() {
    return this._guid
  }

  private _timestamp: Date;

  public get timestamp() {
    return this._timestamp
  }

  private _version: number;

  public get version() {
    return this._version
  }

  public get type() {
    return this._type
  }

  public apply(player: Player) {
    this._payload = player
    this._guid = '1' //TODO new v4 guid
    this._timestamp = new Date()
    this._version = 0
  }


}
