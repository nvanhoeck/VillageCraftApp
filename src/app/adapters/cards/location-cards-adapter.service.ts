import {Injectable} from '@angular/core';
import {GameCardsJsonReaderAdapterService} from "./game-cards-json-reader-adapter.service";
import {map} from "rxjs";
import {LocationsCardsJsonReaderAdapterService} from "./locations-cards-json-reader-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class LocationCardsAdapterService {

  constructor(private readonly locationsCardsJsonReaderAdapterService: LocationsCardsJsonReaderAdapterService) {
  }

  public getAllLocationCards() {
    return this.locationsCardsJsonReaderAdapterService.getAllCards()
  }
}
