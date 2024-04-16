import {Component, DestroyRef, EventEmitter, Input, Output, inject} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {GameCardComponent} from "../game-card/game-card.component";
import {CommonModule} from "@angular/common";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {combineLatest, forkJoin, map, of, tap} from "rxjs";
import {GamePhase} from "../../query/model/game-card-vo";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsWrapperComponent, CardActionsComponent],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.scss'
})
export class PlayerHandComponent {
  private destroyRef = inject(DestroyRef);

  @Input()
  hideActions = false
  @Input()
  cardSelection: string[] = []

  @Output()
  cardClickedEvent = new EventEmitter<string>()

  hoveredCard = ''

  hand$ = this.gameFacade.getPlayerHand$().pipe(takeUntilDestroyed(this.destroyRef))

  actions = [{
    origin: 'HAND',
    actionType: 'PLAY',
    icon: 'arrow_right',
    hide$: this.gameFacade.getCurrentPhase$().pipe(takeUntilDestroyed(this.destroyRef),map(this.isActionPhase), map((isActionPhase => !isActionPhase)))
  },
    {
      origin: 'HAND',
      actionType: 'ARCHIVE',
      icon: 'archive',
      hide$: combineLatest([
        this.gameFacade.getPlayerArchive$().pipe(takeUntilDestroyed(this.destroyRef)),
        this.gameFacade.getCurrentPhase$().pipe(takeUntilDestroyed(this.destroyRef)),
      ]).pipe(map(([archiveAlreadyHasCard, gamePhase]) => {
        console.log(archiveAlreadyHasCard, !this.isActionPhase(gamePhase))
        return archiveAlreadyHasCard || !this.isActionPhase(gamePhase)
      }))
    },
    {
      origin: 'HAND',
      actionType: 'INFO',
      icon: 'info',
      hide$: of(false)
    }] as CardBtnAction[]

  constructor(private readonly gameFacade: GameFacadeService) {
  }

  handleCardClicked(cardId: string) {
    if (this.cardClickedEvent) {
      this.cardClickedEvent.emit(cardId)
    }
  }

  handleCardHover(cardId: string) {
    this.hoveredCard = cardId
  }

  handleCardHoverLeave() {
    this.hoveredCard = ''
  }

  isHovered(id: string) {
    return this.hoveredCard === id
  }

  cardSelected(id: string) {
    return !!this.cardSelection.find((cardId) => cardId === id);
  }

  private isActionPhase (phase: GamePhase) { return phase === 'action'}
}
