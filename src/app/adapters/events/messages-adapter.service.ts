import {Injectable} from '@angular/core';
import {ApplicationMessage, ApplicationMessageTopic} from "./application-message";
import {ApplicationMessageListener} from "./application-message-listener";

@Injectable({
  providedIn: 'root'
})
export class MessagesAdapterService {
  private applicationMessageHandlers: { [key: string]: ApplicationMessageListener[] } = {}

  constructor() {
  }

  public publish(applicationMessage: ApplicationMessage) {
    if (this.applicationMessageHandlers[applicationMessage.topic]) {
      this.applicationMessageHandlers[applicationMessage.topic].forEach((listener) => {
        listener.subscribe(applicationMessage)
      })
    } else {
      throw new Error('No listener found for topic ' + applicationMessage.topic)
    }
  }

  public register(listener: ApplicationMessageListener, topic: ApplicationMessageTopic) {
    if (this.applicationMessageHandlers[topic]) {
      this.applicationMessageHandlers[topic] = [...this.applicationMessageHandlers[topic], listener];
    } else {
      this.applicationMessageHandlers[topic] = [listener];
    }
  }
}
