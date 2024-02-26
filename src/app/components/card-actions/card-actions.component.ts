import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BUTTON_TYPE_CARD_ACTION_SMALL, ButtonComponent} from "../shared/button";
import {Observable} from "rxjs";
import {GameFacadeService} from "../../facades/game-facade.service";

export type CardActionTypes = 'PLAY' | 'ARCHIVE' | 'INFO'

export type CardBtnAction = {
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
  actions: CardBtnAction[] = []
  @Input()
  cardId: string = ''
  cardActionBtnsStyles = BUTTON_TYPE_CARD_ACTION_SMALL

  constructor(private gameFacade: GameFacadeService) {
  }

  handleClick(actionType: CardActionTypes) {
    this.gameFacade.playCardFromTo('HAND', 'ARCHIVE', this.cardId)
  }
}
