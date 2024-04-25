import { v4 as uuidv4 } from 'uuid';

export type GameEventTypes =
    | 'GameCreated'
    | 'PlayerCreated'
    | 'PlayerBaseDecksLoaded';
export type GameEventPayload = any;

export class GameEvent {
    private _guid: string;
    private _version: number;
    private _timestamp: Date;

    public constructor(type: string, payload: GameEventPayload) {
        this._guid = uuidv4();
        this._version = 0;
        this._timestamp = new Date();
        this._type = type;
        this._payload = payload;
    }

    protected _payload: any;

    public get payload() {
        return this._payload;
    }

    private _type: string;

    public get type() {
        return this._type;
    }
}
