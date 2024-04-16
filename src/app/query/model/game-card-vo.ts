import {GameSpace} from "./game-space";

type CardType = 'unit' | 'building' | 'settlement' | 'event' | 'citizen'
type CardAffilitation = 'base' | 'diplomacy' | 'military' | 'treasury' | 'learning' | 'visionary'
export type GamePhase = 'setup' | 'mulligan' | 'draw' | 'production' | 'action' | 'combat' | 'refresh' | 'consumption' | 'end_turn'
export type Trigger = 'exhaust' | 'deploy' | 'condition' | 'banish' | 'claim' | 'foodGain' | 'build'
type GameCommand = {} // TODO

type TriggerRecord = Record<Trigger, GameSpace[]>
export const TRIGGER_FROM_GAME_SPACE: TriggerRecord = {
  "exhaust": ['BUILDING_LANE', 'CITIZEN_LANE'],
  "deploy": ['HAND'],
  "condition": ['HAND', 'CITIZEN_LANE', 'BUILDING_LANE', 'ARCHIVE', 'SETTLEMENT'],
  "banish": ['HAND', 'CITIZEN_LANE', 'BUILDING_LANE', 'ARCHIVE', 'SETTLEMENT'],
  "claim": ['HAND', 'CITIZEN_LANE', 'BUILDING_LANE', 'ARCHIVE', 'SETTLEMENT'],
  "foodGain": ['CITIZEN_LANE', 'BUILDING_LANE'],
  "build": ['CITIZEN_LANE', 'BUILDING_LANE']
};

export type CardAction = {
  trigger: Trigger,
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
