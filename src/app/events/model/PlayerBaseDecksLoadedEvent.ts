import { GameEvent } from './gameEvent';
import { Player } from '../../domain/player';

type PlayerBaseDecksLoadedEventPayload = {
    player: Player;
};

export class PlayerBaseDecksLoadedEvent extends GameEvent {
    public constructor(payload: PlayerBaseDecksLoadedEventPayload) {
        super('PlayerBaseDecksLoaded', payload);
    }

    public override get payload(): PlayerBaseDecksLoadedEventPayload {
        return super.payload;
    }
}
