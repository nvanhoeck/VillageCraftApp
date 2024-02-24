import {Command} from "./command";
import {GameType} from "../../domain/game-type";

type SetupGameCommandPayload = {
  id: string
  gameType: GameType
}

export const isSetupGameCommand = (command: Command): command is SetupGameCommand => {
  return command.type === 'SetupGame'
}

export class SetupGameCommand implements Command {
  private readonly _payload: SetupGameCommandPayload
  private readonly _type = "SetupGame";

  constructor(payload: SetupGameCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
