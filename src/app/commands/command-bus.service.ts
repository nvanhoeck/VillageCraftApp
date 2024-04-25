import { Injectable } from '@angular/core';
import { Command } from './model/command';
import { CommandHandler } from './handlers/command-handler';
import { BehaviorSubject, take } from 'rxjs';
import { MessagesAdapterService } from '../adapters/events/messages-adapter.service';

@Injectable({
    providedIn: 'root',
})
export class CommandBusService {
    private handlers$: BehaviorSubject<{ [key: string]: CommandHandler[] }> =
        new BehaviorSubject({});

    constructor(
        private readonly errorMessagesAdapter: MessagesAdapterService
    ) {}

    registerHandler(command: string, cmdHandler: CommandHandler) {
        this.handlers$
            .asObservable()
            .pipe(take(1))
            .subscribe(handlers => {
                if (handlers[command]) {
                    handlers[command] = [...handlers[command], cmdHandler];
                } else {
                    handlers[command] = [cmdHandler];
                }
                this.handlers$.next(handlers);
            });
    }

    on(cmd: Command) {
        this.handlers$.pipe(take(1)).subscribe(handlers => {
            if (handlers[cmd.type]) {
                handlers[cmd.type].forEach(handler => handler.execute(cmd));
            } else {
                this.errorMessagesAdapter.publish({
                    level: 'ERROR',
                    message: `Could not find command handler for ${cmd.type} at command-bus service`,
                    topic: 'APPLICATION-ERROR',
                });
            }
        });
    }
}
