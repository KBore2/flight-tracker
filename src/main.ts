import { getFlights } from './api-services/flights-service';
import { populateMap } from './dom-servcies/populateFlights';
import L from 'leaflet';

import './components/plane-info-component';
import { Flight } from './types/flightType';
import { from, fromEvent, map, switchMap, tap } from 'rxjs';

const worldMap = L.map('map').setView([4.0383, 21.7587], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(worldMap);

const layerGroup = L.layerGroup().addTo(worldMap);

const form = document.querySelector('form') as HTMLFormElement;
fromEvent(form, 'submit')
  .pipe(
    tap((e) => e.preventDefault()),
    map((e) => (e.target as HTMLFormElement).origin.value),
    switchMap((value: string) => from(getFlights(value)))
  )
  .subscribe((flights: Flight[]) => {
    populateMap(flights, layerGroup);
  });
