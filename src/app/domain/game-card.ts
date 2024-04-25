import { GameSpace } from './game-space';
import { Cost } from './cost';
import { GamePhase } from './GamePhase';
import { Trigger } from './Trigger';

type CardType = 'unit' | 'building' | 'settlement' | 'event' | 'citizen';
type CardAffilitation =
    | 'base'
    | 'diplomacy'
    | 'military'
    | 'treasury'
    | 'learning'
    | 'visionary';
type GameCommand = (commandName: string) => void;

type CardAction = {
    trigger: Trigger;
    commands: GameCommand[];
    phases: GamePhase[];
    args: any;
    icon: string;
};

type TriggerRecord = Record<Trigger, GameSpace[]>;
export const TRIGGER_FROM_GAME_SPACE: TriggerRecord = {
    exhaust: ['BUILDING_LANE', 'CITIZEN_LANE'],
    deploy: ['HAND'],
    condition: [
        'HAND',
        'CITIZEN_LANE',
        'BUILDING_LANE',
        'ARCHIVE',
        'SETTLEMENT',
    ],
    banish: ['HAND', 'CITIZEN_LANE', 'BUILDING_LANE', 'ARCHIVE', 'SETTLEMENT'],
    claim: ['HAND', 'CITIZEN_LANE', 'BUILDING_LANE', 'ARCHIVE', 'SETTLEMENT'],
    gainFood: ['CITIZEN_LANE', 'BUILDING_LANE'],
    gainWood: ['CITIZEN_LANE', 'BUILDING_LANE'],
    gainFoodAndWood: ['CITIZEN_LANE', 'BUILDING_LANE'],
    build: ['CITIZEN_LANE', 'BUILDING_LANE'],
};

export const isCitizenCard = (card: GameCard): card is GameCitizenCard => {
    return card.cardType === 'citizen';
};

export const isBuildingCard = (card: GameCard): card is GameBuildingCard => {
    return card.cardType === 'building';
};
export const isEventCard = (card: GameCard): card is GameEventCard => {
    return card.cardType === 'event';
};
export const isUnitCard = (card: GameCard): card is GameUnitCard => {
    return card.cardType === 'unit';
};

export type GameCardDto = {
    id: string;
    cardId: string;
    attack?: number;
    defence?: number;
    health?: number;
    title: string;
    description: string;
    cardType: CardType;
    cardAffiliation: CardAffilitation;
    deckLimit: number;
    actions: CardAction[];
    exhausted: boolean;
    cost?: Cost;
};

export class GameCard {
    constructor(
        id: string,
        cardId: string,
        title: string,
        description: string,
        cardAffiliation: CardAffilitation,
        deckLimit: number,
        actions: CardAction[],
        cardType: CardType,
        exhausted: boolean
    ) {
        this._id = id;
        this._cardId = cardId;
        this._title = title;
        this._description = description;
        this._cardAffiliation = cardAffiliation;
        this._deckLimit = deckLimit;
        this._actions = actions;
        this._cardType = cardType;
        this._exhausted = exhausted;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    private _cardId: string;

    get cardId(): string {
        return this._cardId;
    }

    private _title: string;

    get title(): string {
        return this._title;
    }

    private _description: string;

    get description(): string {
        return this._description;
    }

    private _cardAffiliation: CardAffilitation;

    get cardAffiliation(): CardAffilitation {
        return this._cardAffiliation;
    }

    private _deckLimit: number;

    get deckLimit(): number {
        return this._deckLimit;
    }

    private _actions: CardAction[];

    get actions(): CardAction[] {
        return this._actions;
    }

    private _cardType: CardType;

    get cardType(): CardType {
        return this._cardType;
    }

    private _exhausted: boolean;

    get exhausted(): boolean {
        return this._exhausted;
    }

    applyId(id: string) {
        this._id = id;
    }

    exhaust() {
        this._exhausted = true;
    }
}

export class GameUnitCard extends GameCard {
    constructor(
        id: string,
        cardId: string,
        title: string,
        description: string,
        cardAffiliation: CardAffilitation,
        deckLimit: number,
        actions: CardAction[],
        attack: number,
        defence: number,
        health: number
    ) {
        super(
            id,
            cardId,
            title,
            description,
            cardAffiliation,
            deckLimit,
            actions,
            'unit',
            false
        );
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
    constructor(
        id: string,
        cardId: string,
        title: string,
        description: string,
        cardAffiliation: CardAffilitation,
        deckLimit: number,
        actions: CardAction[],
        attack: number,
        defence: number,
        health: number
    ) {
        super(
            id,
            cardId,
            title,
            description,
            cardAffiliation,
            deckLimit,
            actions,
            'citizen',
            false
        );
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
    constructor(
        id: string,
        cardId: string,
        title: string,
        description: string,
        cardAffiliation: CardAffilitation,
        deckLimit: number,
        actions: CardAction[],
        health: number,
        cost: Cost
    ) {
        super(
            id,
            cardId,
            title,
            description,
            cardAffiliation,
            deckLimit,
            actions,
            'building',
            false
        );
        this._health = health;
        this._underConstruction = false;
        this._constructionProgress = this._health;
        this._cost = cost;
    }

    private _health: number;
    private _underConstruction: boolean;
    private _constructionProgress: number;
    private _cost: Cost;

    get health(): number {
        return this._health;
    }

    get underConstruction(): boolean {
        return this._underConstruction;
    }

    get constructionProgress(): number {
        return this._constructionProgress;
    }

    get cost(): Cost {
        return this._cost;
    }

    startBuilding() {
        this._underConstruction = true;
        this._constructionProgress = 0;
    }

    continueBuild(amount: number) {
        this._constructionProgress += amount;
        if (this._constructionProgress >= this._health) {
            this._underConstruction = false;
        }
    }

    completeBuilding() {
        this._underConstruction = false;
    }

    finishBuildingAtHealth(amount: number) {
        this._underConstruction = false;
        this._health = amount;
    }
}

export class GameEventCard extends GameCard {
    constructor(
        id: string,
        cardId: string,
        title: string,
        description: string,
        cardAffiliation: CardAffilitation,
        deckLimit: number,
        actions: CardAction[]
    ) {
        super(
            id,
            cardId,
            title,
            description,
            cardAffiliation,
            deckLimit,
            actions,
            'event',
            false
        );
    }
}

export const DefaultGameCard = new GameCard(
    '',
    '',
    '',
    '',
    'base',
    0,
    [],
    'settlement',
    false
);
export const DefaultBuildingCardCard = new GameBuildingCard(
    '',
    '',
    '',
    '',
    'base',
    0,
    [],
    0,
    { wood: 0, food: 0 }
);
