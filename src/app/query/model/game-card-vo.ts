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

export type GameCardVO = {
  readonly id: string
  readonly cardId: string
  readonly attack?: number;
  readonly defence?: number;
  readonly health?: number;
  readonly title: string,
  readonly description: string,
  readonly cardType: CardType,
  readonly cardAffiliation: CardAffilitation
  readonly deckLimit: number
  readonly actions: CardAction[]
}
