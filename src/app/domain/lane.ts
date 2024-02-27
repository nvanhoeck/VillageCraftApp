import {GameCard} from "./game-card";

export class Lane {
  private lane: GameCard[]
  private allowedTypes: 'building' | 'citizen'

  constructor(allowedTypes: 'building' | 'citizen') {
    this.lane = []
    this.allowedTypes = allowedTypes
  }


  addCard(card: GameCard) {
    this.lane.push(card)
  }

  findCardsInLane() {
    return this.lane
  }
}
