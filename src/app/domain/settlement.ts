import {GameCard} from "./game-card";

export class Settlement implements GameCard {
  actions
  cardAffiliation
  cardId
  cardType
  deckLimit
  description
  id
  title
  health

  constructor(settlementCard: GameCard) {
    this.actions = settlementCard.actions
    this.cardAffiliation = settlementCard.cardAffiliation
    this.cardType = settlementCard.cardType
    this.cardId = settlementCard.cardId
    this.deckLimit = settlementCard.deckLimit
    this.description = settlementCard.description
    this.id = settlementCard.id
    this.title = settlementCard.title
    this.health = settlementCard.health
  }


}
