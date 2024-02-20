import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";

@Component({
  selector: 'app-building-lane',
  standalone: true,
  imports: [],
  templateUrl: './building-lane.component.html',
  styleUrl: './building-lane.component.scss'
})
export class BuildingLaneComponent {
  buildingLane$ = this.gameFacade.getPlayerBuildingLane$()

  constructor(private readonly gameFacade: GameFacadeService) {


  }
}
