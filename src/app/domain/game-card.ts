type CardType = 'unit' | 'building' | 'settlement' | 'event' | 'citizen'
type CardAffilitation = 'base' | 'diplomacy' | 'military' | 'treasury' | 'learning' | 'visionary'
type GamePhase = 'draw' | 'production' | 'action' | 'combat' | 'refresh' | 'consumption' | 'end_turn'
type Trigger = 'exhaust' | 'deploy' | 'condition' | 'banish' | 'claim' | 'foodGain' | 'build'
type GameCommand = {} // TODO

type CardAction = {
  triggers: Trigger[],
  commands: GameCommand[]
  phases: GamePhase[]
  args: any[]
}

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
  actions: CardAction[]
}

export const DefaultGameCard: GameCard = {
  actions: [],
  cardAffiliation: 'base',
  cardId: "",
  cardType: 'settlement',
  deckLimit: 0,
  description: "",
  id: "",
  title: ""

}
