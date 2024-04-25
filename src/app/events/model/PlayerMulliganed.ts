import { GameEvent } from './gameEvent';
import { Player } from '../../domain/player';

type PlayerMulliganedEventPayload = {
    player: Player;
};

export class PlayerMulliganedEvent extends GameEvent {
    public constructor(payload: PlayerMulliganedEventPayload) {
        super('PlayerMulliganed', payload);
    }

    public override get payload(): PlayerMulliganedEventPayload {
        return super.payload;
    }
}
