import { Command } from './command';
import { GameSpace } from '../../domain/game-space';

type RemoveCardFromCommandPayload = {
    from: GameSpace;
    cardId: string;
    playerId: string;
    gameId: string;
};

export const isRemoveCardFromCommand = (
    command: Command
): command is RemoveCardFromCommand => {
    return command.type === 'RemoveCardFrom';
};

export class RemoveCardFromCommand implements Command {
    private readonly _payload: RemoveCardFromCommandPayload;
    private readonly _type = 'RemoveCardFrom';

    constructor(payload: RemoveCardFromCommandPayload) {
        this._payload = payload;
    }

    public get payload() {
        return this._payload;
    }

    public get type() {
        return this._type;
    }
}
