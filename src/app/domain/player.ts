import { PlayerType } from './player-type';
import {
    DefaultBuildingCardCard,
    GameBuildingCard,
    GameCardDto,
    GameCitizenCard,
    GameEventCard,
} from './game-card';
import { shuffleArray } from '../utils/shuffle';
import { Lane } from './lane';
import { v4 as uuidv4 } from 'uuid';
import { GameSpace } from './game-space';
import { GamePhase } from './GamePhase';

export class Player {
    private _deck: (GameBuildingCard | GameCitizenCard | GameEventCard)[];
    private _discardPile: (
        | GameBuildingCard
        | GameCitizenCard
        | GameEventCard
    )[];
    private _graveyard: (GameBuildingCard | GameCitizenCard | GameEventCard)[];
    private _banishment: (GameBuildingCard | GameCitizenCard | GameEventCard)[];
    private _settlement: GameBuildingCard;
    private _buildingLane: Lane;
    private _citizenLane: Lane;
    private _archive:
        | (GameBuildingCard | GameCitizenCard | GameEventCard)
        | undefined;
    private _hand: (GameBuildingCard | GameCitizenCard | GameEventCard)[];
    private _food: number;
    private _wood: number;
    private _inPhase: GamePhase;

    constructor(id: string) {
        this._id = id;
        this._settlement = DefaultBuildingCardCard;
        this._playerType = 'PC';
        this._buildingLane = new Lane('building');
        this._citizenLane = new Lane('citizen');
        this._hand = [];
        this._deck = [];
        this._discardPile = [];
        this._graveyard = [];
        this._banishment = [];
        this._archive = undefined;
        this._wood = 0;
        this._food = 0;
        this._inPhase = 'setup';
    }

    private _id: string;

    public get id() {
        return this._id;
    }

    private _playerType: PlayerType;

    public get playerType() {
        return this._playerType;
    }

    public loadBaseDeck(cards: GameCardDto[]) {
        // Logic for card duplication ?
        cards.forEach(card => {
            switch (card.cardId) {
                // Settlement
                case '1':
                    this._settlement = new GameBuildingCard(
                        uuidv4(),
                        card.cardId,
                        card.title,
                        card.description,
                        card.cardAffiliation,
                        card.deckLimit,
                        card.actions,
                        card.health!,
                        card.cost!
                    );
                    break;
                // Farm
                case '2':
                    this._buildingLane.addCard(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        ),
                        0
                    );
                    this._deck.push(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        )
                    );
                    this._deck.push(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        )
                    );
                    break;
                //Lumbermill
                case '3':
                    this._buildingLane.addCard(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        ),
                        1
                    );
                    this._deck.push(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        )
                    );
                    this._deck.push(
                        new GameBuildingCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.health!,
                            card.cost!
                        )
                    );
                    break;
                //Regular Citizen
                case '4':
                    this._citizenLane.addCard(
                        new GameCitizenCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.attack!,
                            card.defence!,
                            card.health!
                        ),
                        0
                    );
                    this._citizenLane.addCard(
                        new GameCitizenCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.attack!,
                            card.defence!,
                            card.health!
                        ),
                        1
                    );
                    this._citizenLane.addCard(
                        new GameCitizenCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.attack!,
                            card.defence!,
                            card.health!
                        ),
                        2
                    );
                    this._deck.push(
                        new GameCitizenCard(
                            uuidv4(),
                            card.cardId,
                            card.title,
                            card.description,
                            card.cardAffiliation,
                            card.deckLimit,
                            card.actions,
                            card.attack!,
                            card.defence!,
                            card.health!
                        )
                    );
                    break;
                default:
                    if (card.cardType === 'citizen') {
                        this._deck.push(
                            new GameCitizenCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions,
                                card.attack!,
                                card.defence!,
                                card.health!
                            )
                        );
                        this._deck.push(
                            new GameCitizenCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions,
                                card.attack!,
                                card.defence!,
                                card.health!
                            )
                        );
                    }
                    if (card.cardType === 'building') {
                        this._deck.push(
                            new GameBuildingCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions,
                                card.health!,
                                card.cost!
                            )
                        );
                        this._deck.push(
                            new GameBuildingCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions,
                                card.health!,
                                card.cost!
                            )
                        );
                    }
                    if (card.cardType === 'event') {
                        this._deck.push(
                            new GameEventCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions
                            )
                        );
                        this._deck.push(
                            new GameEventCard(
                                uuidv4(),
                                card.cardId,
                                card.title,
                                card.description,
                                card.cardAffiliation,
                                card.deckLimit,
                                card.actions
                            )
                        );
                    }
            }
        });

        this._deck = shuffleArray(this._deck);

        //TODO remove, test phase
        this._hand.push(this._deck.pop()!);
        this._hand.push(this._deck.pop()!);
        this._hand.push(this._deck.pop()!);
        this._hand.push(this._deck.pop()!);
        this._hand.push(this._deck.pop()!);
        this._hand.push(this._deck.pop()!);
    }

    public addPlayer(id: string, playerType: PlayerType) {
        this._id = id;
        this._playerType = playerType;
    }

    findFoodAmount() {
        return this._food;
    }

    findWoodAmount() {
        return this._wood;
    }

    public findSettlement() {
        return this._settlement;
    }

    public findHand() {
        return this._hand;
    }

    findDeck() {
        return this._deck;
    }

    findArchive() {
        return this._archive;
    }

    findBuildingLane() {
        return this._buildingLane;
    }

    findCitizenLane() {
        return this._citizenLane;
    }

    findDiscardPile() {
        return this._discardPile;
    }

    findGraveyard() {
        return this._graveyard;
    }

    findBanishment() {
        return this._banishment;
    }

    findInPhase() {
        return this._inPhase;
    }

    playCardFromHandToArchive(cardId: string) {
        const foundCard = this._hand.find(card => card.id === cardId);
        if (!foundCard) {
            throw new Error('Card not found in hand');
        }
        if (this._archive) {
            throw new Error('Archive already has card');
        }
        this._archive = foundCard;
        this._hand.splice(this._hand.indexOf(foundCard), 1);
    }

    removeCardFromHand(cardId: string) {
        const gameCard = this._hand.find(card => card.id === cardId);
        if (gameCard) {
            this._hand.splice(this._hand.indexOf(gameCard), 1);
        }
        throw new Error(`Card ${cardId} not found`);
    }

    playCardFromHandToCitizenLaneAtSlot(
        cardId: string,
        index: number | undefined
    ) {
        if (index === undefined) return;
        const foundCard = this._hand.find(card => card.id === cardId);
        if (!foundCard || foundCard.cardType !== 'citizen') {
            throw new Error('Card not found in hand');
        }
        this._citizenLane.addCard(foundCard as GameCitizenCard, index);
        this._hand.splice(this._hand.indexOf(foundCard), 1);
    }

    playCardFromHandToBuildingLaneAtSlot(
        cardId: string,
        index: number | undefined
    ) {
        if (index == undefined) return;
        const foundCard = this._hand.find(card => card.id === cardId);
        if (!foundCard || foundCard.cardType !== 'building') {
            throw new Error('Card not found in hand');
        }
        this._buildingLane.addCardForConstruction(
            foundCard as GameBuildingCard,
            index
        );
        this._hand.splice(this._hand.indexOf(foundCard), 1);
    }

    mulligan(cardIds: string[]) {
        cardIds.forEach(cardId => {
            const card = this._hand.find(c => c.id === cardId);
            this._deck.push(card!);
            this._hand.splice(this._hand.indexOf(card!), 1);
        });
        this._deck = shuffleArray(this._deck);
        cardIds.forEach(() => {
            this._hand.push(this._deck.pop()!);
        });
    }

    exhaustCard(
        cardId: string,
        gamePhase: GamePhase,
        gameSpace: GameSpace
    ): void {
        if (gamePhase === 'production' && gameSpace === 'BUILDING_LANE') {
            this._buildingLane.exhaustCard(cardId);
        }
    }

    gainFoodFromCard(
        cardId: string,
        gamePhase: GamePhase,
        gameSpace: GameSpace
    ) {
        if (gameSpace === 'BUILDING_LANE') {
            this._buildingLane.exhaustCard(cardId);
            const card = this._buildingLane.findCardInLane(cardId);
            // TODO find might become filter
            const amount = card?.actions.find(
                action => action.trigger === 'gainFood'
            )!.args.amount as number;
            this.addFoodResource(amount);
            return amount;
        } else {
            return 0;
        }
    }

    gainWoodFromCard(
        cardId: string,
        gamePhase: GamePhase,
        gameSpace: GameSpace
    ) {
        if (gameSpace === 'BUILDING_LANE') {
            this._buildingLane.exhaustCard(cardId);
            const card = this._buildingLane.findCardInLane(cardId);
            // TODO find might become filter
            const amount = card?.actions.find(
                action => action.trigger === 'gainWood'
            )!.args.amount as number;
            this.addWoodResource(amount);
            return amount;
        } else {
            return 0;
        }
    }

    setInPhase(gamePhase: GamePhase) {
        this._inPhase = gamePhase;
    }

    private addFoodResource(amount: number) {
        this._food = this._food + amount;
    }

    private addWoodResource(amount: number) {
        this._wood = this._wood + amount;
    }
}
