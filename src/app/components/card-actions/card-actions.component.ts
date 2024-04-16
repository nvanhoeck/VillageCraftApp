import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BUTTON_TYPE_CARD_ACTION_SMALL, ButtonComponent} from "../shared/button";
import {Observable, of} from "rxjs";
import {GameFacadeService} from "../../facades/game-facade.service";
import {GameSpace} from "../../domain/game-space";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {CardAction, GameCardVO} from "../../query/model/game-card-vo";

export type CardActionTypes = 'PLAY' | 'ARCHIVE' | 'INFO' | 'EXHAUST'

export type CardBtnAction = {
  origin: GameSpace,
  actionType: CardActionTypes
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
export class CardActionsComponent {
  @Input()
  defaultActions: CardBtnAction[] = []
  @Input()
  card: GameCardVO | undefined = undefined
  @Input()
  origin: GameSpace | undefined = undefined
  cardActionBtnsStyles = BUTTON_TYPE_CARD_ACTION_SMALL

  constructor(private gameFacade: GameFacadeService, private errorMessageService: MessagesAdapterService) {
  }

  defineEligibleActions(gameSpace: GameSpace)  {
    const allowedActions = this.card!.actions.filter((cardAction) => this.gameFacade.actionIsAllowed(cardAction, gameSpace))
    return [...this.defaultActions, ...allowedActions.map((action) => this.mapCardActionToButtonAction(action))]
  }

  handleClick(actionType: CardActionTypes) {
    switch (actionType) {
      case "ARCHIVE":
        this.gameFacade.playCardFromTo(this.origin!, 'ARCHIVE', this.card!.id);
        break;
      case "PLAY":
        if (this.card)
          switch (this.card.cardType) {
            case 'building':
              this.gameFacade.playCardFromTo(this.origin!, 'BUILDING_LANE', this.card!.id);
              break;
            case 'event':
              // TODO Play event
              this.gameFacade.playCardFromTo(this.origin!, 'ARCHIVE', this.card!.id);
              break;
            case 'citizen':
              this.gameFacade.playCardFromTo(this.origin!, 'CITIZEN_LANE', this.card!.id);
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
      origin: this.origin!,
      //TODO trigger(s)???
      actionType: 'EXHAUST',
      icon: 'switch_access_shortcut',
      hide$:of(false)
    } as CardBtnAction
  }
}
