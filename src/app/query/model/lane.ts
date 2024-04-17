import {GameCardVO} from "./game-card-vo";

export class Lane {
  private lane: GameCardVO[]
  private allowedTypes: 'building' | 'citizen'

  constructor(allowedTypes: 'building' | 'citizen') {
    this.lane = []
    this.allowedTypes = allowedTypes
  }


  addCard(card: GameCardVO, index?: number) {
    this.lane.splice(index ?? this.lane.length, 0, card)
  }

  findCardsInLane() {
    return this.lane
  }

  exhaustCard(cardId: string) {
    let card = this.findCardInLane(cardId)!
    let updatedCard = {...card, exhausted: true}
    this.lane.splice(this.lane.indexOf(card), 1, updatedCard)
  }

  findCardInLane(cardId: string) {
    return this.lane.find((card) => card.id === cardId);
  }
}
