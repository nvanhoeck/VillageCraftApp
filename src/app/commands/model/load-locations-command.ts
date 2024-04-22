import {Command} from "./command";


type LoadLocationsCommandPayload = { gameId: string }

export const isLoadLocationsCommand = (command: Command): command is LoadLocationsCommand => {
  return command.type === 'LoadLocations'
}

export class LoadLocationsCommand implements Command {
  private readonly _payload: LoadLocationsCommandPayload
  private readonly _type = "LoadLocations";

  constructor(payload: LoadLocationsCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
