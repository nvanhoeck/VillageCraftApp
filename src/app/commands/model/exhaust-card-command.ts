import { Command } from './command';
import { GameSpace } from '../../query/model/game-space';
import { GamePhase } from '../../query/model/game-card-vo';

type ExhaustCommandPayload = {
    gameSpace: GameSpace;
    cardId: string;
    gameId: string;
    playerId: string;
    gamePhase: GamePhase;
};

export const isExhaustCardCommand = (
    command: Command
): command is ExhaustCardCommand => {
    return command.type === 'ExhaustCard';
};

export class ExhaustCardCommand implements Command {
    private readonly _payload: ExhaustCommandPayload;
    private readonly _type = 'ExhaustCard';

    constructor(payload: ExhaustCommandPayload) {
        this._payload = payload;
    }

    public get payload() {
        return this._payload;
    }

    public get type() {
        return this._type;
    }
}
