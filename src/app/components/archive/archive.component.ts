import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {DefaultGameCard} from "../../domain/game-card";

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  archive$ = this.gameFacade.getPlayerArchive$()

  defaultCard = DefaultGameCard

  constructor(private readonly gameFacade: GameFacadeService) {

  }
}
