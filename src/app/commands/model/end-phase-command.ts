import {Command} from "./command";

type EndPhaseCommandPayload = {
  gameId: string
  playerId: string
}

export const isEndPhaseCommand = (command: Command): command is EndPhaseCommand => {
  return command.type === 'EndPhase'
}

export class EndPhaseCommand implements Command {
  private readonly _payload: EndPhaseCommandPayload
  private readonly _type = "EndPhase";

  constructor(payload: EndPhaseCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
