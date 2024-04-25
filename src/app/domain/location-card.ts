import { Trigger } from './Trigger';
import { GamePhase } from './GamePhase';

export type LocationCard = {
    id: string;
    cardId: string;
    title: string;
    description: string;
    locationRank: number;
    claim: number;
    currentClaims: Record<string, number>;
    dispute: number;
    release: string;
    campaign: string;
    allowedCardLimit: number;
    actions: LocationAction[];
};

export type LocationAction = {
    trigger: Trigger;
    commands: GameCommand[];
    phases: GamePhase[];
    args: any;
    icon: string;
};

export type LocationLanes = {
    one: LocationCard[];
    two: LocationCard[];
    three: LocationCard[];
};

type GameCommand = (commandName: string) => void;
