import {Command} from "./command";


type LoadPlayerBaseDecksCommandPayload = { gameId: string; playerIds: string[] }

export const isLoadPlayerBaseDecksCommand = (command: Command): command is LoadPlayerBaseDecksCommand => {
  return command.type === 'LoadPlayerBaseDecks'
}

export class LoadPlayerBaseDecksCommand implements Command {
  private readonly _payload: LoadPlayerBaseDecksCommandPayload
  private readonly _type = "LoadPlayerBaseDecks";

  constructor(payload: LoadPlayerBaseDecksCommandPayload) {
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }

  public get type() {
    return this._type
  }
}
