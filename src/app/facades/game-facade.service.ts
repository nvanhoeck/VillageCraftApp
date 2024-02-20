import {Injectable} from '@angular/core';
import {GetSettlementUseCaseService} from "../use-case/get-settlement-use-case.service";
import {GetPlayerHandUseCaseService} from "../use-case/get-player-hand-use-case.service";
import {GetPlayerDeckUseCaseService} from "../use-case/get-player-deck-use-case.service";
import {GetPlayerArchiveUseCaseService} from "../use-case/get-player-archive-use-case.service";
import {GetPlayerBuildingLaneUseCaseService} from "../use-case/get-player-building-lane-use-case.service";
import {GetPlayerCitizenLaneUseCaseService} from "../use-case/get-player-citizen-lane-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {

  //TODO store playerID?

  constructor(private getSettlementUseCase: GetSettlementUseCaseService,
              private getPlayerHandUseCase: GetPlayerHandUseCaseService,
              private getPlayerDeckUseCase: GetPlayerDeckUseCaseService,
              private getPlayerArchiveUseCase: GetPlayerArchiveUseCaseService,
              private getPlayerBuildingLaneUseCase: GetPlayerBuildingLaneUseCaseService,
              private getPlayerCitizenLaneUseCase: GetPlayerCitizenLaneUseCaseService,
  ) {
  }

  public getSettlement$() {
    return this.getSettlementUseCase.getSettlement$('niko')
  }

  getPlayerHand$() {
    return this.getPlayerHandUseCase.getPlayerHand$('niko')
  }

  getPlayerDeck$() {
    return this.getPlayerDeckUseCase.getPlayerDeck$('niko')
  }

  getPlayerArchive$() {
    return this.getPlayerArchiveUseCase.getPlayerArchive$('niko')
  }

  getPlayerBuildingLane$() {
    return this.getPlayerBuildingLaneUseCase.getPlayerBuildingLane$('niko')
  }

  getPlayerCitizenLane$() {
    return this.getPlayerCitizenLaneUseCase.getPlayerCitizenLane$('niko')
  }


}
