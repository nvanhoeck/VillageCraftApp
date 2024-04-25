import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { LocationCardVO } from '../../query/model/location-card-vo';

type CardStyle = 'NORMAL' | 'SMALL';

@Component({
    selector: 'app-location-card',
    standalone: true,
    imports: [MatIcon, NgIf],
    templateUrl: './location-card.component.html',
    styleUrl: './location-card.component.scss',
})
export class LocationCardComponent {
    @Input()
    card?: LocationCardVO = undefined;
    @Output()
    handleHoverHandle = new EventEmitter<LocationCardVO>();
    @Output()
    handleHoverLeaveHandler = new EventEmitter<LocationCardVO>();
    @Input()
    cardStyle: CardStyle = 'NORMAL';

    handleHover: ($event: MouseEvent) => void = () => {
        if (this.card) {
            this.handleHoverHandle.emit(this.card);
        }
    };

    handleHoverLeave: ($event: MouseEvent) => void = () => {
        if (this.card) {
            this.handleHoverLeaveHandler.emit(this.card);
        }
    };
}
