import {GameType} from "./game-type";
import {PlayerInfo} from "./player-info";
import {GamePhase} from "./game-card-vo";
import {LocationCard, LocationLanes} from "../../domain/location-card";
import {LocationCardVO, LocationLanesVO} from "./location-card-vo";


export class Game {
  constructor(id: string, gameType: GameType) {
    this._id = id
    this._gameType = gameType
    this._players = []
    this._gamePhase = 'setup'
    this._locations = {one: [], two: [], three: []}
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

  private _locations:LocationLanesVO

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

  findLocationsInLanes() {
    return this._locations
  }

  updateLocations(locationLanes: LocationLanes) {
    this._locations.one = [
      ...locationLanes.one.map((locationC) => this.mapLocationLaneDomainToVO(locationC))
    ]
    this._locations.two = [
      ...locationLanes.two.map((locationC) => this.mapLocationLaneDomainToVO(locationC))
    ]
    this._locations.three = [
      ...locationLanes.three.map((locationC) => this.mapLocationLaneDomainToVO(locationC))
    ]
  }

  private mapLocationLaneDomainToVO(locationC: LocationCard): LocationCardVO {
    return {
      ...locationC,
      exhausted: false
    }
  }

  findLocationsInLane(row: number): LocationCardVO[] {
    switch (row) {
      case 1: return this._locations.one;
      case 2: return this._locations.two;
      case 3: return this._locations.three;
      default: return []
    }
  }
}
