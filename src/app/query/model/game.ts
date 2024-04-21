import {GameType} from "./game-type";
import {PlayerInfo} from "./player-info";
import {GamePhase} from "./game-card-vo";


export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._gamePhase = 'setup'
  }

  private _gamePhase: GamePhase

  public get gamePhase() {
    return this._gamePhase
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
    this._gamePhase = 'mulligan'
  }

  startProductionPhase() {
    this._gamePhase = 'production'
  }

  changePhase(nextPhase: GamePhase) {
    this._gamePhase = nextPhase
  }
}
