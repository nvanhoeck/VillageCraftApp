import {GameType} from "./game-type";
import {Player} from "./player";
import {GamePhase} from "./game-card";


export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._phase = 'setup'
  }

  private _id: string

  public get id() {
    return this._id
  }

  private _phase: GamePhase


  get phase(): GamePhase {
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
    this._phase = 'mulligan'
  }

  initiate() {
    this._phase = 'production'
  }
}
