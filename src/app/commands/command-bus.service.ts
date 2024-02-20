import {Injectable} from '@angular/core';
import {Command} from './model/command'
import {CommandHandler} from "./handlers/command-handler";
import {AsyncSubject, BehaviorSubject, filter, map, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandBusService {
  private handlers$: AsyncSubject<[string: CommandHandler[]]> = new AsyncSubject()

  constructor() {
  }

  registerHandler(command: string, cmdHandler: CommandHandler) {
    this.handlers$.asObservable().pipe(map((handlers) => {
        if (handlers[command]) {
          //TODO Send event to error handler
          throw new Error('Already registered handler for ' + command+ '. Only 1 allowed')
        } else {
          handlers[command] = [cmdHandler]
        }
        return handlers
      }
    ), take(1)).subscribe((cmdHandlers) => this.handlers$.next(cmdHandlers))
  }

  on(cmd: Command) {
    this.handlers$.subscribe(handlers => {
      handlers[cmd.type].forEach((cmdHandler) => cmdHandler.execute(cmd))
    })
  }
}
