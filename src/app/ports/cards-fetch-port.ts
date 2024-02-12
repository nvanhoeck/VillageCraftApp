import {GameCard} from "../domain/game-card";
import {Observable} from "rxjs";

export interface CardsFetchPort {
  getAllCards: () => Observable<GameCard[]>
}
