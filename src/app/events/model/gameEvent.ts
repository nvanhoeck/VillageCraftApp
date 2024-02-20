export interface GameEvent {
  guid: string;
  version: number;
  timestamp: Date
  payload: Object
  type: string
}
