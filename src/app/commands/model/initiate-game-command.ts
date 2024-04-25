import { Command } from './command';

type InitiateGameCommandPayload = {
    gameId: string;
};

export const isInitiateGameCommand = (
    command: Command
): command is InitiateGameCommand => {
    return command.type === 'InitiateGame';
};

export class InitiateGameCommand implements Command {
    private readonly _payload: InitiateGameCommandPayload;
    private readonly _type = 'InitiateGame';

    constructor(payload: InitiateGameCommandPayload) {
        this._payload = payload;
    }

    public get payload() {
        return this._payload;
    }

    public get type() {
        return this._type;
    }
}
