import { Component, Input } from '@angular/core';
import { MessagesAdapterService } from '../../../adapters/events/messages-adapter.service';
import { ApplicationMessageListener } from '../../../adapters/events/application-message-listener';
import { ApplicationMessage } from '../../../adapters/events/application-message';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-message-overlay',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-overlay.component.html',
    styleUrl: './message-overlay.component.scss',
})
export class MessageOverlayComponent implements ApplicationMessageListener {
    @Input()
    title: string | undefined = undefined;
    @Input()
    subtitle: string | undefined = undefined;

    constructor(private messageAdapter: MessagesAdapterService) {
        this.messageAdapter.register(this, 'GAME-OVERLAY');
    }

    subscribe(message: ApplicationMessage): void {
        this.title = message.message;
        this.subtitle = message.subMessage;
        setTimeout(() => {
            this.title = undefined;
            this.subtitle = undefined;
        }, 3000);
    }
}
