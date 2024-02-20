import {PlayerType} from "./player-type";
import {DefaultGameCard, GameCard} from "./game-card";
import {Settlement} from "./settlement";
import {shuffleArray} from "../utils/shuffle";
import {Lane} from "./lane";

export class Player {
  private _deck: GameCard[]
  private _settlement: Settlement
  private _buildingLane: Lane
  private _citizenLane: Lane
  private _archive: GameCard | undefined
  private _hand: GameCard[]

  constructor() {
    this._id = 'unknown'
    this._settlement = new Settlement(DefaultGameCard)
    this._playerType = 'PC'
    this._buildingLane = new Lane('building')
    this._citizenLane = new Lane('citizen')
    this._hand = []
    this._deck = []
  }

  private _id: string

  public get id() {
    return this._id
  }

  private _playerType: PlayerType

  public get playerType() {
    return this._playerType
  }

  public loadBaseDeck(cards: GameCard[]) {
    // Logic for card duplication ?
    cards.forEach((card) => {
      switch (card.cardId) {
        // Settlement
        case "1":
          this._settlement = new Settlement(card);
          break
        // Farm
        case "2":
          this._buildingLane.addCard(card)
          this._deck.push(card)
          this._deck.push(card)
          break
        //Lumbermill
        case "3":
          this._buildingLane.addCard(card)
          this._deck.push(card)
          this._deck.push(card)
          break
        //Regular Citizen
        case "4":
          this._citizenLane.addCard(card);
          this._citizenLane.addCard(card);
          break
        default:
          this._deck.push(card)
          this._deck.push(card)
      }
    })

    this._deck = shuffleArray(this._deck)
  }

  public createPlayer(id: string, playerType: PlayerType) {
    this._id = id
    this._playerType = playerType
  }
}
