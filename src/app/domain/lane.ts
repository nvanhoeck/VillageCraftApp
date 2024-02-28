import {GameBuildingCard, GameCitizenCard} from "./game-card";

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
}
