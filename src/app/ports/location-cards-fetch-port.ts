import {GameCard} from "../domain/game-card";
import {Observable} from "rxjs";
import {LocationCard} from "../domain/location-card";

export interface LocationCardsFetchPort {
  getAllCards: () => Observable<LocationCard[]>
}
