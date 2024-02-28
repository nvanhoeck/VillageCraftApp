import {Command} from "./command";

type MulliganPhaseCommandPayload = {
  gameId: string
}

export const isMulliganPhaseCommand = (command: Command): command is MulliganPhaseCommand => {
  return command.type === 'MulliganPhase'
}

export class MulliganPhaseCommand implements Command {
  private readonly _payload: MulliganPhaseCommandPayload
  private readonly _type = "MulliganPhase";

  constructor(payload: MulliganPhaseCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
