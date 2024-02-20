import {GameType} from "./game-type";
import {Player} from "./player";

export class Game {
  private _id: string
  private _gameType: GameType
  private _players: Player[]

  constructor() {
    this._id = 'unknown'
    this._gameType = 'PVC'
    this._players = []
  }

  public createGame(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
  }

  public addPlayer(player: Player) {
    this._players.push(player)
  }

  public get id() {
    return this._id
  }

  public get gameType() {
    return this._gameType
  }

  public get players() {
    return this._players
  }


}
