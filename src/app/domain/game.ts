import {GameType} from "./game-type";
import {Player} from "./player";

export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
  }

  private _id: string

  public get id() {
    return this._id
  }

  private _gameType: GameType

  public get gameType() {
    return this._gameType
  }

  private _players: Player[]

  public get players() {
    return this._players
  }

  public addPlayer(player: Player) {
    this._players.push(player)
  }


}
