import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {GameEvent} from "./model/gameEvent";
import {EventHandler} from "./event-handler";
import {MessagesAdapterService} from "../adapters/events/messages-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private handlers$: BehaviorSubject<{ [key: string]: EventHandler[] }> = new BehaviorSubject({})

  constructor(private readonly errorMessagesAdapter: MessagesAdapterService) {
  }

  registerHandler(event: string, eventHandler: EventHandler) {
    this.handlers$.asObservable().pipe(take(1)).subscribe((handlers) => {
      if (handlers[event]) {
        handlers[event] = [...handlers[event], eventHandler];
      } else {
        handlers[event] = [eventHandler];
      }
      this.handlers$.next(handlers);
    });
  }

  on(event: GameEvent) {
    this.handlers$.pipe(take(1)).subscribe((handlers) => {
      if (handlers[event.type]) {
        handlers[event.type].forEach((handler) => handler.execute(event))
      } else {
        this.errorMessagesAdapter.publish({
          level: 'ERROR', message: `Could not find event handler for ${event.type} at event-bus service`,
          topic: "APPLICATION-ERROR"
        })
      }
    });
  }
}
