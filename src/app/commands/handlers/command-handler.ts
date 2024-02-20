import {Command} from "../model/command";

export interface CommandHandler {
  execute: (cmd: Command) => void
}
