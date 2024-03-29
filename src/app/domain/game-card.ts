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

export const isCitizenCard = (card: GameCard): card is GameCitizenCard => {
  return card.cardType === 'citizen'
}

export const isBuildingCard = (card: GameCard): card is GameBuildingCard => {
  return card.cardType === 'building'
}
export const isEventCard = (card: GameCard): card is GameEventCard => {
  return card.cardType === 'event'
}
export const isUnitCard = (card: GameCard): card is GameUnitCard => {
  return card.cardType === 'unit'
}

export type GameCardDto = {
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

export class GameCard {
  constructor(id: string, cardId: string, title: string, description: string, cardAffiliation: CardAffilitation, deckLimit: number, actions: CardAction[], cardType: CardType) {
    this._id = id;
    this._cardId = cardId;
    this._title = title;
    this._description = description;
    this._cardAffiliation = cardAffiliation;
    this._deckLimit = deckLimit;
    this._actions = actions;
    this._cardType = cardType
  }

  private _id: string

  get id(): string {
    return this._id;
  }

  private _cardId: string

  get cardId(): string {
    return this._cardId;
  }

  private _title: string

  get title(): string {
    return this._title;
  }

  private _description: string

  get description(): string {
    return this._description;
  }

  private _cardAffiliation: CardAffilitation

  get cardAffiliation(): CardAffilitation {
    return this._cardAffiliation;
  }

  private _deckLimit: number

  get deckLimit(): number {
    return this._deckLimit;
  }

  private _actions: CardAction[]

  get actions(): CardAction[] {
    return this._actions;
  }

  private _cardType: CardType

  get cardType(): CardType {
    return this._cardType;
  }

  applyId(id: string) {
    this._id = id
  }
}

export class GameUnitCard extends GameCard {
  constructor(id: string, cardId: string, title: string, description: string, cardAffiliation: CardAffilitation, deckLimit: number, actions: CardAction[], attack: number, defence: number, health: number) {
    super(id, cardId, title, description, cardAffiliation, deckLimit, actions, 'unit');
    this._attack = attack;
    this._defence = defence;
    this._health = health;
  }

  private _attack: number;

  get attack(): number {
    return this._attack;
  }

  private _defence: number;

  get defence(): number {
    return this._defence;
  }

  private _health: number;

  get health(): number {
    return this._health;
  }
}

export class GameCitizenCard extends GameCard {
  constructor(id: string, cardId: string, title: string, description: string, cardAffiliation: CardAffilitation, deckLimit: number, actions: CardAction[], attack: number, defence: number, health: number) {
    super(id, cardId, title, description, cardAffiliation, deckLimit, actions, 'citizen');
    this._attack = attack;
    this._defence = defence;
    this._health = health;
  }

  private _attack: number;

  get attack(): number {
    return this._attack;
  }

  private _defence: number;

  get defence(): number {
    return this._defence;
  }

  private _health: number;

  get health(): number {
    return this._health;
  }
}

export class GameBuildingCard extends GameCard {
  constructor(id: string, cardId: string, title: string, description: string, cardAffiliation: CardAffilitation, deckLimit: number, actions: CardAction[], health: number) {
    super(id, cardId, title, description, cardAffiliation, deckLimit, actions, 'building');
    this._health = health;
  }

  private _health: number;

  get health(): number {
    return this._health;
  }
}

export class GameEventCard extends GameCard {
  constructor(id: string, cardId: string, title: string, description: string, cardAffiliation: CardAffilitation, deckLimit: number, actions: CardAction[]) {
    super(id, cardId, title, description, cardAffiliation, deckLimit, actions, 'event');
  }
}


export const DefaultGameCard = new GameCard("", "", "", "", "base", 0, [], 'settlement')
export const DefaultBuildingCardCard = new GameBuildingCard("", "", "", "", "base", 0, [], 0)
