import {Component} from '@angular/core';
import {ApplicationMessageListener} from "../../adapters/events/application-message-listener";
import {ErrorMessagesAdapterService} from "../../adapters/events/error-messages-adapter.service";
import {ApplicationMessage} from "../../adapters/events/application-message";
import {ToastComponent} from "../shared/toast/toast.component";
import {BehaviorSubject, first} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-error-messages-toast',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './error-messages-toast.component.html',
  styleUrl: './error-messages-toast.component.scss'
})
export class ErrorMessagesToastComponent implements ApplicationMessageListener {
  messages$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[])

  constructor(private readonly errorMessagesAdapter: ErrorMessagesAdapterService) {
    this.errorMessagesAdapter.register(this, 'APPLICATION-ERROR')
  }

  subscribe(message: ApplicationMessage): void {
    this.messages$.pipe(first()).subscribe((msgs) => {
      this.messages$.next([...msgs, message.message])
    })

    setTimeout(() => {
      this.messages$.pipe(first()).subscribe((msgs: string[]) => {
        if (msgs) {
          const messageIndex = msgs.indexOf(message.message)
          msgs.splice(messageIndex, 1)
          this.messages$.next(msgs)
        }
      })
    }, 5000)
  }

}
