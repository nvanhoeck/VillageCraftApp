import {PlayerType} from "./player-type";
import {DefaultGameCard, GameCard} from "./game-card";
import {Settlement} from "./settlement";
import {shuffleArray} from "../utils/shuffle";
import {Lane} from "./lane";
import {v4 as uuidv4} from "uuid";

export class Player {
  private _deck: GameCard[]
  private _discardPile: GameCard[]
  private _graveyard: GameCard[]
  private _banishment: GameCard[]
  private _settlement: Settlement
  private _buildingLane: Lane
  private _citizenLane: Lane
  private _archive: GameCard | undefined
  private _hand: GameCard[]

  constructor(id: string) {
    this._id = id
    this._settlement = new Settlement(DefaultGameCard)
    this._playerType = 'PC'
    this._buildingLane = new Lane('building')
    this._citizenLane = new Lane('citizen')
    this._hand = []
    this._deck = []
    this._discardPile = []
    this._graveyard = []
    this._banishment = []
    this._archive = undefined
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
      card.id = uuidv4()
      switch (card.cardId) {
        // Settlement
        case "1":
          this._settlement = new Settlement(card);
          break
        // Farm
        case "2":
          this._buildingLane.addCard(card, 0)
          this._deck.push({...card, id: uuidv4()})
          this._deck.push({...card, id: uuidv4()})
          break
        //Lumbermill
        case "3":
          this._buildingLane.addCard(card, 1)
          this._deck.push({...card, id: uuidv4()})
          this._deck.push({...card, id: uuidv4()})
          break
        //Regular Citizen
        case "4":
          this._citizenLane.addCard(card, 0);
          this._citizenLane.addCard({...card, id: uuidv4()}, 1);
          this._citizenLane.addCard({...card, id: uuidv4()}, 2);
          this._deck.push({...card, id: uuidv4()})
          break
        default:
          this._deck.push(card)
          this._deck.push({...card, id: uuidv4()})
      }
    })

    this._deck = shuffleArray(this._deck)

    //TODO remove, test phase
    this._hand.push(this._deck.pop()!)
    this._hand.push(this._deck.pop()!)
    this._hand.push(this._deck.pop()!)
    this._hand.push(this._deck.pop()!)
    this._hand.push(this._deck.pop()!)
    this._hand.push(this._deck.pop()!)
  }

  public addPlayer(id: string, playerType: PlayerType) {
    this._id = id
    this._playerType = playerType
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

  findDiscardPile() {
    return this._discardPile;
  }

  findGraveyard() {
    return this._graveyard;
  }

  findBanishment() {
    return this._banishment;
  }

  playCardFromHandToArchive(cardId: string) {
    const foundCard = this._hand.find((card) => card.id === cardId);
    if (!foundCard) {
      throw new Error('Card not found in hand')
    }
    if (!!this._archive) {
      throw new Error('Archive already has card')
    }
    this._archive = foundCard
    this._hand.splice(this._hand.indexOf(foundCard), 1)
  }

  removeCardFromHand(cardId: string) {
    const gameCard = this._hand.find((card) => card.id === cardId);
    if (gameCard) {
      this._hand.splice(this._hand.indexOf(gameCard), 1);
    }
    throw new Error(`Card ${cardId} not found`)
  }

  playCardFromHandToCitizenLaneAtSlot(cardId: string, index: number | undefined) {
    debugger
    if (index === undefined) return;
    const foundCard = this._hand.find((card) => card.id === cardId);
    if (!foundCard) {
      throw new Error('Card not found in hand')
    }
    this._citizenLane.addCard(foundCard, index)
    this._hand.splice(this._hand.indexOf(foundCard), 1)
  }

  playCardFromHandToBuildingLaneAtSlot(cardId: string, index: number | undefined) {
    debugger
    if (index == undefined) return;
    const foundCard = this._hand.find((card) => card.id === cardId);
    if (!foundCard) {
      throw new Error('Card not found in hand')
    }
    this._buildingLane.addCard(foundCard, index)
    this._hand.splice(this._hand.indexOf(foundCard), 1)
  }
}
