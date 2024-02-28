import {Command} from "./command";


type MulliganCommandPayload = { gameId: string; playerId: string, cardIds: string[] }

export const isMulliganCommand = (command: Command): command is MulliganCommand => {
  return command.type === 'Mulligan'
}

export class MulliganCommand implements Command {
  private readonly _payload: MulliganCommandPayload
  private readonly _type = "Mulligan";

  constructor(payload: MulliganCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
