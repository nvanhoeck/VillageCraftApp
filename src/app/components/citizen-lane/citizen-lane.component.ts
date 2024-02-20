import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";

@Component({
  selector: 'app-citizen-lane',
  standalone: true,
  imports: [],
  templateUrl: './citizen-lane.component.html',
  styleUrl: './citizen-lane.component.scss'
})
export class CitizenLaneComponent {
  citizenLane$ = this.gameFacade.getPlayerCitizenLane$()

  constructor(private readonly gameFacade: GameFacadeService) {


  }
}
