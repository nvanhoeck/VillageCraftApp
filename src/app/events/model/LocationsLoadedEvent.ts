import { GameEvent } from './gameEvent';
import { Game } from '../../domain/game';

type LocationsLoadedEventPayload = {
    game: Game;
};

export class LocationsLoadedEvent extends GameEvent {
    public constructor(payload: LocationsLoadedEventPayload) {
        super('LocationsLoaded', payload);
    }

    public override get payload(): LocationsLoadedEventPayload {
        return super.payload;
    }
}
