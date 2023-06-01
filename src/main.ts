import { getFlights } from './api-services/flights-service';
import { populateMap } from './dom-servcies/populateFlights';
import { Map} from 'leaflet';

import './components/plane-info-component';

const map = .map('map').setView([4.0383, 21.7587], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

const form = document.querySelector('form');
form?.addEventListener('submit', async (e: any) => {
  e.preventDefault();

  let flights;
  if (e.target.origin.value !== '')
    flights = await getFlights(e.target.origin.value);
  else flights = await getFlights();

  populateMap(flights, layerGroup);
});
