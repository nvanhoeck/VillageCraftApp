import { GameEvent } from './gameEvent';
import { PlayerType } from '../../query/model/player-type';

type PlayerCreatedEventPayload = {
    id: string;
    playerType: PlayerType;
    gameId: string;
};

export class PlayerCreatedEvent extends GameEvent {
    public constructor(payload: PlayerCreatedEventPayload) {
        super('PlayerCreated', payload);
    }

    public override get payload(): PlayerCreatedEventPayload {
        return super.payload;
    }
}
