import {GameType} from "./game-type";

export class Game {
  private _id: string
  private _gameType: GameType

  constructor() {
  }

  public createGame(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
  }

  public get id() {
    return this._id
  }

  public get gameType() {
    return this._gameType
  }


}
