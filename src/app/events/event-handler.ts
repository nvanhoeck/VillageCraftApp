import {GameEvent} from "./model/gameEvent";

export interface EventHandler {
  execute: (event: GameEvent) => void
}
