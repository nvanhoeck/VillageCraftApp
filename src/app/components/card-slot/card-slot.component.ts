import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-card-slot',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './card-slot.component.html',
    styleUrl: './card-slot.component.scss',
})
export class CardSlotComponent {
    @Input()
    icon: string | undefined = undefined;
    @Input()
    text: string | undefined = undefined;
    @Input()
    index: number = -1;
    @Output()
    indexEventEmitter = new EventEmitter<number>();

    callOnClickHandler() {
        this.indexEventEmitter.emit(this.index);
    }
}
