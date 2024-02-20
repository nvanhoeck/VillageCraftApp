import {Command} from "./command";
import {PlayerType} from "../../domain/player-type";



type SetupPlayerCommandPayload = {
  playerType: PlayerType
}

export const isSetupPlayerCommand = (command: Command): command is SetupPlayerCommand => {
  return command.type === 'SetupPlayer'
}

export class SetupPlayerCommand implements Command {
  private readonly _payload: SetupPlayerCommandPayload
  private readonly _type = "SetupPlayer";

  constructor(payload: SetupPlayerCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
