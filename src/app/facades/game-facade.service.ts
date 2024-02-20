import {Injectable} from '@angular/core';
import {GetSettlementUseCaseService} from "../use-case/get-settlement-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {

  //TODO store playerID?

  constructor(private getSettlementUseCase: GetSettlementUseCaseService) {
  }

  public getSettlement$() {
    return this.getSettlementUseCase.getSettlement$('niko')
  }
}
