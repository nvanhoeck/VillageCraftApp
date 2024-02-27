import {GameCard} from "./game-card";

export class Lane {
  private lane: GameCard[]
  private allowedTypes: 'building' | 'citizen'

  constructor(allowedTypes: 'building' | 'citizen') {
    this.lane = []
    this.allowedTypes = allowedTypes
  }


  addCard(card: GameCard, index: number) {
    this.lane.splice(index, 0, card)
  }

  findCardsInLane() {
    return this.lane
  }
}
