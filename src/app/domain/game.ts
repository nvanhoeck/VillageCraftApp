import { GameType } from './game-type';
import { Player } from './player';

import { GamePhase } from './GamePhase';
import { LocationCard, LocationLanes } from './location-card';

export class Game {
    constructor(id: string, gameType: GameType) {
        this._id = id;
        this._gameType = gameType;
        this._players = [];
        this._phase = 'setup';
        this._round = 0;
        this._locations = { one: [], two: [], three: [] };
    }

    private _id: string;

    public get id() {
        return this._id;
    }

    private _phase: GamePhase;

    get phase(): GamePhase {
        return this._phase;
    }

    private _gameType: GameType;

    public get gameType() {
        return this._gameType;
    }

    private _players: Player[];

    public get players() {
        return this._players;
    }

    private _round: number;

    public getRound() {
        return this._round;
    }

    private _locations: LocationLanes;

    public addPlayer(player: Player) {
        this._players.push(player);
    }

    startMulliganPhase() {
        this._phase = 'mulligan';
        this._players.forEach(p => p.setInPhase('mulligan'));
    }

    initiate() {
        this._phase = 'production';
        this._players.forEach(p => p.setInPhase('production'));
    }

    endPhase(playerId: string) {
        const foundPlayer = this._players.find(
            player => player.id === playerId
        )!;
        switch (this._phase) {
            case 'setup':
            case 'mulligan':
            case 'draw':
                foundPlayer.setInPhase('production');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('production');
            case 'production':
                foundPlayer.setInPhase('action');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('action');
            case 'action':
                foundPlayer.setInPhase('combat');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('combat');
            case 'combat':
                foundPlayer.setInPhase('refresh');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('refresh');
            case 'refresh':
                foundPlayer.setInPhase('consumption');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('consumption');
            case 'consumption':
                foundPlayer.setInPhase('end_turn');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('end_turn');
            case 'end_turn':
                foundPlayer.setInPhase('draw');
                return this.switchPhaseWhenAllPlayersHaveMovedOn('draw');
        }
    }

    findLocationsInLanes() {
        return this._locations;
    }

    private switchPhaseWhenAllPlayersHaveMovedOn(nextPhase: GamePhase) {
        /*let playersAreStillInPhase = this._players.map((player) => player.findInPhase()).includes(this._phase);
    if(!playersAreStillInPhase) {
      this._phase = nextPhase
      if(this._phase === 'draw') {
        this._round++
      }
      return true
    } else {
      return false
    }*/
        // TODO apply to a single user
        this._phase = nextPhase;
        if (this._phase === 'draw') {
            this._round++;
        }
        return true;
    }

    setupLocations(locationCards: LocationCard[]) {
        this._locations.one.push(
            ...locationCards
                .filter(location => location.locationRank === 1)
                .slice(0, 3)
        );
        this._locations.two.push(
            ...locationCards
                .filter(location => location.locationRank === 2)
                .slice(0, 3)
        );
        this._locations.three.push(
            ...locationCards
                .filter(location => location.locationRank === 1)
                .slice(3, 5)
        );
    }
}
