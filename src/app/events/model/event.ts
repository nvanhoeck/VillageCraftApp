export interface Event {
  readonly guid: string;
  readonly version: number;
  readonly timestamp: Date
  readonly payload: Object
}
