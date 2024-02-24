import {GameType} from "./game-type";

type GameStatus = 'ADDING_PLAYERS'

export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._gameStatus = 'ADDING_PLAYERS'
  }

  private _gameStatus: GameStatus

  public get gameStatus() {
    return this._gameStatus
  }

  private _id: string

  public get id() {
    return this._id
  }

  private _gameType: GameType

  public get gameType() {
    return this._gameType
  }

  private _players: string[]

  public get players() {
    return this._players
  }

  public handlePlayerAdded(playerId: string) {
    this._players.push(playerId)
  }


}
