import { Trigger } from '../../domain/Trigger';
import { GamePhase } from '../../domain/GamePhase';

export type LocationCardVO = {
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
    exhausted: boolean;
};

export type LocationAction = {
    trigger: Trigger;
    commands: GameCommand[];
    phases: GamePhase[];
    args: unknown;
    icon: string;
};

export type LocationLanesVO = {
    one: LocationCardVO[];
    two: LocationCardVO[];
    three: LocationCardVO[];
};

type GameCommand = (commandName: string) => void;
