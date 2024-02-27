import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ToastComponent} from "../shared/toast/toast.component";
import {BehaviorSubject, first} from "rxjs";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {ApplicationMessage} from "../../adapters/events/application-message";

@Component({
  selector: 'app-game-messages-toast',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './game-messages-toast.component.html',
  styleUrl: './game-messages-toast.component.scss'
})
export class GameMessagesToastComponent {
  messages$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[])

  constructor(private readonly errorMessagesAdapter: MessagesAdapterService) {
    this.errorMessagesAdapter.register(this, 'GAME-INFO')
  }

  subscribe(message: ApplicationMessage): void {
    this.messages$.pipe(first()).subscribe((msgs) => {
      this.messages$.next([...msgs, message.message])
    })

    //TODO proper cleanup
    setTimeout(() => {
      this.messages$.pipe(first()).subscribe((msgs: string[]) => {
        if (msgs) {
          const messageIndex = msgs.indexOf(message.message)
          msgs.splice(messageIndex, 1)
          this.messages$.next(msgs)
        }
      })
    }, 10000)
  }
}
