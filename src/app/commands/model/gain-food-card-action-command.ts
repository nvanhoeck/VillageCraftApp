import { Command } from './command';
import { GameSpace } from '../../query/model/game-space';
import { GamePhase } from '../../query/model/game-card-vo';

type GainFoodCardActionCommandPayload = {
    gameSpace: GameSpace;
    cardId: string;
    gameId: string;
    playerId: string;
    gamePhase: GamePhase;
};

export const isGainFoodCardActionCardCommand = (
    command: Command
): command is GainFoodCardActionCardCommand => {
    return command.type === 'GainFoodCardActionCard';
};

export class GainFoodCardActionCardCommand implements Command {
    private readonly _payload: GainFoodCardActionCommandPayload;
    private readonly _type = 'GainFoodCardActionCard';

    constructor(payload: GainFoodCardActionCommandPayload) {
        this._payload = payload;
    }

    public get payload() {
        return this._payload;
    }

    public get type() {
        return this._type;
    }
}
