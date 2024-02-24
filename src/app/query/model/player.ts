import {PlayerType} from "./player-type";
import {Settlement} from "../../domain/settlement";
import {Lane} from "../../domain/lane";
import {DefaultGameCard, GameCard} from "../../domain/game-card";

export class Player {
  private _deck: GameCard[]
  private _settlement: Settlement
  private _buildingLane: Lane
  private _citizenLane: Lane
  private _archive: GameCard | undefined
  private _hand: GameCard[]
  private _id: string
  private _playerType: PlayerType

  constructor(id: string, playerType: PlayerType) {
    this._id = id
    this._settlement = new Settlement(DefaultGameCard)
    this._playerType = 'PC'
    this._buildingLane = new Lane('building')
    this._citizenLane = new Lane('citizen')
    this._hand = []
    this._deck = []
    this._playerType = playerType
  }

  updateSettlement(settlement: Settlement) {
    this._settlement = settlement
  }

  updateCitizenLane(lane: Lane) {
    this._citizenLane = lane
  }

  updateDeck(gameCards: GameCard[]) {
    this._deck = gameCards
  }

  updateHand(gameCards: GameCard[]) {
    this._hand = gameCards
  }

  updateArchive(archive: GameCard | undefined) {
    this._archive = archive
  }

  updateBuildingLane(lane: Lane) {
    this._buildingLane = lane
  }

  public findSettlement() {
    return this._settlement;
  }

  public findHand() {
    return this._hand;
  }

  findDeck() {
    return this._deck;
  }

  findArchive() {
    return this._archive;
  }

  findBuildingLane() {
    return this._buildingLane
  }

  findCitizenLane() {
    return this._citizenLane
  }
}