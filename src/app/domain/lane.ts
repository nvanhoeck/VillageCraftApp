import {GameBuildingCard, GameCitizenCard} from "./game-card";
import {GameSpace} from "./game-space";
import {GamePhase} from "./GamePhase";

export class Lane {
  private lane: (GameCitizenCard | GameBuildingCard)[]
  private allowedTypes: 'building' | 'citizen'

  constructor(allowedTypes: 'building' | 'citizen') {
    this.lane = []
    this.allowedTypes = allowedTypes
  }


  addCard(card: GameCitizenCard | GameBuildingCard, index: number) {
    this.lane.splice(index, 0, card)
  }

  findCardsInLane() {
    return this.lane
  }

  exhaustCard(cardId: string) {
    let card = this.findCardInLane(cardId)!
    card.exhaust()
  }

  findCardInLane(cardId: string) {
    return this.lane.find((card) => card.id === cardId);
  }

  addCardForConstruction(card: GameBuildingCard, index: number) {
    card.startBuilding()
    this.lane.splice(index, 0, card)
  }
}
