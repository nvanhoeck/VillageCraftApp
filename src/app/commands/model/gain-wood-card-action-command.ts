import {Command} from "./command";
import {GameSpace} from "../../query/model/game-space";
import {GamePhase} from "../../query/model/game-card-vo";

type GainWoodCardActionCommandPayload = {
  gameSpace: GameSpace;
  cardId: string;
  gameId: string;
  playerId: string;
  gamePhase: GamePhase;
}

export const isGainWoodCardActionCardCommand = (command: Command): command is GainWoodCardActionCardCommand => {
  return command.type === 'GainWoodCardActionCard'
}

export class GainWoodCardActionCardCommand implements Command {
  private readonly _payload: GainWoodCardActionCommandPayload
  private readonly _type = "GainWoodCardActionCard";

  constructor(payload: GainWoodCardActionCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
