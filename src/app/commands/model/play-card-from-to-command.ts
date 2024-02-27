import {Command} from "./command";
import {GameSpace} from "../../domain/game-space";


type PlayCardFromToCommandPayload = {
  from: GameSpace,
  to: GameSpace,
  cardId: string,
  playerId: string,
  gameId: string
}

export const isPlayCardFromToCommand = (command: Command): command is PlayCardFromToCommand => {
  return command.type === 'PlayCardFromTo'
}

export class PlayCardFromToCommand implements Command {
  private readonly _payload: PlayCardFromToCommandPayload
  private readonly _type = "PlayCardFromTo";

  constructor(payload: PlayCardFromToCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
