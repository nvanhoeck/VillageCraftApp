import {GameType} from "./game-type";
import {PlayerInfo} from "./player-info";

type GameStatus = 'SETUP' | 'MULLIGAN' | 'PRODUCTION'

export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._gameStatus = 'SETUP'
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

  private _players: PlayerInfo[]

  public get players() {
    return this._players
  }

  public handlePlayerAdded(playerId: string) {
    this._players.push(new PlayerInfo(playerId))
  }


  startMulliganPhase() {
    this._gameStatus = 'MULLIGAN'
  }

  startProductionPhase() {
    this._gameStatus = 'PRODUCTION'
  }
}
