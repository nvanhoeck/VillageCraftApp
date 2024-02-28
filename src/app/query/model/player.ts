import {PlayerType} from "./player-type";
import {Lane} from "../../domain/lane";
import {
  DefaultBuildingCardCard,
  GameBuildingCard,
  GameCitizenCard,
  GameEventCard,
  isBuildingCard,
  isCitizenCard
} from "../../domain/game-card";
import {GameCardVO} from "./game-card-vo";

export class Player {
  private _deck: GameCardVO[]
  private _discardPile: GameCardVO[]
  private _settlement: GameCardVO
  // TODO Change to query model
  private _buildingLane: Lane
  private _citizenLane: Lane
  private _archive: GameCardVO | undefined
  private _hand: GameCardVO[]
  private _id: string
  private _playerType: PlayerType
  private _graveyard: GameCardVO[]
  private _banishment: GameCardVO[]

  constructor(id: string, playerType: PlayerType) {
    this._id = id
    this._settlement = this.mapDomainCardToVO(DefaultBuildingCardCard)
    this._playerType = 'PC'
    this._buildingLane = new Lane('building')
    this._citizenLane = new Lane('citizen')
    this._hand = []
    this._deck = []
    this._discardPile = []
    this._graveyard = []
    this._banishment = []
    this._playerType = playerType
  }

  updateSettlement(settlement: GameBuildingCard) {
    this._settlement = this.mapDomainCardToVO(settlement)
  }

  updateCitizenLane(lane: Lane) {
    this._citizenLane = lane
  }

  updateDeck(gameCards: (GameCitizenCard | GameBuildingCard | GameEventCard)[]) {
    this._deck = gameCards.map(this.mapDomainCardToVO)
  }

  updateDiscardPile(gameCards: (GameCitizenCard | GameBuildingCard | GameEventCard)[]) {
    this._discardPile = gameCards.map(this.mapDomainCardToVO)
  }

  updateBanishment(gameCards: (GameCitizenCard | GameBuildingCard | GameEventCard)[]) {
    this._banishment = gameCards.map(this.mapDomainCardToVO)
  }

  updateGraveyard(gameCards: (GameCitizenCard | GameBuildingCard | GameEventCard)[]) {
    this._graveyard = gameCards.map(this.mapDomainCardToVO)
  }

  updateHand(gameCards: (GameCitizenCard | GameBuildingCard | GameEventCard)[]) {
    this._hand = gameCards.map(this.mapDomainCardToVO)
  }

  updateArchive(archive: GameCitizenCard | GameBuildingCard | GameEventCard | undefined) {
    this._archive = archive ? this.mapDomainCardToVO(archive) : undefined
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

  findDiscardPile() {
    return this._discardPile;
  }

  findGraveyard() {
    return this._graveyard;
  }

  findBanishment() {
    return this._banishment
  }

  private mapDomainCardToVO(card: GameCitizenCard | GameBuildingCard | GameEventCard) {
    const gameCard = {
      id: card.id,
      cardId: card.cardId,
      title: card.title,
      description: card.description,
      cardType: card.cardType,
      cardAffiliation: card.cardAffiliation,
      deckLimit: card.deckLimit,
      actions: card.actions,
    }
    if (isCitizenCard(card)) {
      return {...gameCard, attack: card.attack, defence: card.defence, health: card.health}
    }
    if (isBuildingCard(card)) {
      return {...gameCard, health: card.health}
    } else {
      return gameCard
    }
  }
}
