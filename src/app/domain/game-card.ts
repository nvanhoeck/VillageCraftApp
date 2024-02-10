type CardType = 'unit' | 'building' | 'settlement' | 'event' | 'citizen'
type CardAffilitation = 'base' | 'diplomacy' | 'military' | 'treasury' | 'learning' | 'visionary'

export type GameCard = {
  id: string
  cardId: string
  attack?: number;
  defence?: number;
  health?: number;
  title: string,
  description: string,
  cardType: CardType,
  cardAffiliation: CardAffilitation
  deckLimit: number
}
