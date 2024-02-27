import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {DefaultGameCard} from "../../domain/game-card";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {of} from "rxjs";

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsWrapperComponent, CardActionsComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  archive$ = this.gameFacade.getPlayerArchive$()
  isHovered = false

  defaultCard = DefaultGameCard
  actions = [{
    actionType: 'PLAY',
    icon: 'arrow_right',
    hide$: of(false),
  },
    {
      actionType: 'INFO',
      icon: 'info',
      hide$: of(false)
    }] as CardBtnAction[]

  constructor(private readonly gameFacade: GameFacadeService) {

  }
}
