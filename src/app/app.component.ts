import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar';
import { CommandHandlersRegistryService } from './commands/command-handlers-registry.service';
import { ErrorMessagesToastComponent } from './components/error-messages-toast/error-messages-toast.component';
import { EventHandlersRegistryService } from './events/event-handlers-registry.service';
import { GameMessagesToastComponent } from './components/game-messages-toast/game-messages-toast.component';
import { MessageOverlayComponent } from './components/shared/message-overlay/message-overlay.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        ErrorMessagesToastComponent,
        GameMessagesToastComponent,
        MessageOverlayComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [CommandHandlersRegistryService, EventHandlersRegistryService],
})
export class AppComponent {
    title = 'VillageCraftApp';

    constructor(
        commandHandlersRegistryService: CommandHandlersRegistryService,
        eventHandlersRegistryService: EventHandlersRegistryService
    ) {
        console.log(commandHandlersRegistryService);
        console.log(eventHandlersRegistryService);
    }
}
