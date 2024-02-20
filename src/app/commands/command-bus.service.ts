import {Injectable} from '@angular/core';
import {Command} from './model/command'
import {CommandHandler} from "./handlers/command-handler";
import {BehaviorSubject, take} from "rxjs";
import {SetupPlayerCommandHandlerService} from "./handlers/setup-player-command-handler.service";
import {SetupGameCommandHandlerService} from "./handlers/setup-game-command-handler.service";
import {LoadPlayerBaseDecksCommandHandlerService} from "./handlers/load-player-base-decks-command-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CommandBusService {
  private handlers$: BehaviorSubject<{ [key: string]: CommandHandler[] }> = new BehaviorSubject({});

  constructor(private readonly setupGameCommandHandlerService: SetupGameCommandHandlerService,
              private readonly setupPlayerCommandHandlerService: SetupPlayerCommandHandlerService,
              private readonly loadPlayerBaseDecksCommandHandlerService: LoadPlayerBaseDecksCommandHandlerService,
  ) {
    this.handlers$.next({
      'SetupGame': [setupGameCommandHandlerService],
      'SetupPlayer': [setupPlayerCommandHandlerService],
      'LoadPlayerBaseDecks': [loadPlayerBaseDecksCommandHandlerService]
    })
  }

  /*registerHandler(command: string, cmdHandler: CommandHandler) {
    console.log('handler registered', command, cmdHandler)
    this.handlers$.asObservable().pipe(take(1)).subscribe((handlers) => {
      if (handlers[command]) {
        handlers[command] = [...handlers[command], cmdHandler];
      } else {
        handlers[command] = [cmdHandler];
      }
      this.handlers$.next(handlers);
    });
  }*/

  on(cmd: Command) {
    this.handlers$.pipe(take(1)).subscribe((handlers) => {
      handlers[cmd.type].forEach((handler) => handler.execute(cmd))
    });
  }
}
