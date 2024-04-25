import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as locationCards from '../../../assets/data/cards/location-cards.json';
import { LocationCardsFetchPort } from '../../ports/location-cards-fetch-port';
import { LocationCard } from '../../domain/location-card';

@Injectable({
    providedIn: 'root',
})
export class LocationsCardsJsonReaderAdapterService
    implements LocationCardsFetchPort
{
    constructor() {}

    getAllCards(): Observable<LocationCard[]> {
        return of(
            JSON.parse(JSON.stringify(locationCards.data)) as LocationCard[]
        );
    }
}
