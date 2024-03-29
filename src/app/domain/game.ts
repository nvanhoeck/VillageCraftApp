import {GameType} from "./game-type";
import {Player} from "./player";

type GamePhases = 'SETUP' | 'MULLIGAN' | 'PRODUCTION'

export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._phase = 'SETUP'
  }

  private _id: string

  public get id() {
    return this._id
  }

  private _phase: GamePhases


  get phase(): GamePhases {
    return this._phase;
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

  startMulliganPhase() {
    this._phase = 'MULLIGAN'
  }

  initiate() {
    this._phase = 'PRODUCTION'
  }
}
