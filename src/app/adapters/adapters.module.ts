import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardsJsonReaderAdapterService } from './cards/game-cards-json-reader-adapter.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagesAdapterService } from './events/messages-adapter.service';

@NgModule({
    declarations: [],
    imports: [HttpClientModule, CommonModule],
    providers: [GameCardsJsonReaderAdapterService, MessagesAdapterService],
})
export class AdaptersModule {}
