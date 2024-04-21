import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BUTTON_TYPE_CARD_ACTION_SMALL, ButtonComponent} from "../shared/button";
import {combineLatest, EMPTY, map, Observable, of} from "rxjs";
import {GameFacadeService} from "../../facades/game-facade.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {CardAction, GameCardVO, Trigger} from "../../query/model/game-card-vo";
import {GameSpace} from "../../query/model/game-space";


export type CardBtnAction = {
  gameSpace: GameSpace,
  actionType: Trigger
  icon: string
  hide$: Observable<boolean>
}

@Component({
  selector: 'app-card-actions',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card-actions.component.html',
  styleUrl: './card-actions.component.scss'
})
export class CardActionsComponent implements OnInit{
  @Input()
  defaultActions: CardBtnAction[] = []
  @Input()
  card: GameCardVO | undefined = undefined
  @Input()
  gameSpace: GameSpace | undefined = undefined
  cardActionBtnsStyles = BUTTON_TYPE_CARD_ACTION_SMALL

  eligibleActions$: Observable<CardBtnAction[]> = EMPTY


  constructor(private gameFacade: GameFacadeService, private errorMessageService: MessagesAdapterService) {
  }

  ngOnInit() {
    this.eligibleActions$ = this.gameFacade.getAllowedActions$(this.card?.id!, this.gameSpace!).pipe(map((actions) => {
      return [...this.defaultActions, ...actions.map((action) => this.mapCardActionToButtonAction(action))]
    }))
  }

  handleClick(actionType: Trigger) {
    switch (actionType) {
      case "gainFoodAndWood":
        this.gameFacade.exhaustCard(this.gameSpace!, this.card!.id);
        break;
      case "gainWood":
        this.gameFacade.gainWood(this.gameSpace!, this.card!.id);
        break;
      case "gainFood":
        this.gameFacade.gainFood(this.gameSpace!, this.card!.id);
        break;
      case "exhaust":
        this.gameFacade.exhaustCard(this.gameSpace!, this.card!.id)
        break
      case "archive":
        this.gameFacade.playCardFromTo(this.gameSpace!, 'ARCHIVE', this.card!.id);
        break;
      case "deploy":
        if (this.card)
          switch (this.card.cardType) {
            case 'building':
              this.gameFacade.playCardFromTo(this.gameSpace!, 'BUILDING_LANE', this.card!.id);
              break;
            case 'event':
              // TODO Play event
              this.gameFacade.playCardFromTo(this.gameSpace!, 'ARCHIVE', this.card!.id);
              break;
            case 'citizen':
              this.gameFacade.playCardFromTo(this.gameSpace!, 'CITIZEN_LANE', this.card!.id);
              break;
            default:
              this.errorMessageService.publish({
                level: 'ERROR',
                message: `Card not find a way to play cardType ${this.card.cardType} in LoadPlayerBaseDecksCommandHandlerService`,
                topic: "APPLICATION-ERROR"
              })
          } else {
          this.errorMessageService.publish({
            level: 'ERROR',
            message: `Card is undefined in LoadPlayerBaseDecksCommandHandlerService`,
            topic: "APPLICATION-ERROR"
          })
        }
        break;
      default:
        this.errorMessageService.publish({
          level: 'ERROR',
          message: `Not ationTypeHandler defined for ${actionType} in LoadPlayerBaseDecksCommandHandlerService`,
          topic: "APPLICATION-ERROR"
        })
    }
  }

  private mapCardActionToButtonAction(cardAction: CardAction) {
    return {
      gameSpace: this.gameSpace!,
      actionType: cardAction.trigger,
      //icon: 'switch_access_shortcut',
      icon: cardAction.icon,
      hide$:of(false)
    } as CardBtnAction
  }

  protected readonly origin = origin;
}
