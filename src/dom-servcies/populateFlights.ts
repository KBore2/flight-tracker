import plane from '../assets/grey-plane.png';
import { Flight } from '../types/flightType';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { Info } from '../types/planeInfoType';

export const populateMap = (
  flights: Flight[],
  layerGroup: L.LayerGroup<any>
) => {
  layerGroup.clearLayers();

  let i = 0;
  flights.forEach((flight) => {
    const planeIcon = L.icon({
      iconUrl: plane,

      iconSize: [20, 20],
    });

    L.marker([flight.latitude, flight.longitude], {
      icon: planeIcon,
      rotationAngle: flight.true_track - 45,
    })
      .addTo(layerGroup)
      .on('click', (e) => {
        const planeInfo = document.querySelector('plane-info');

        const info: Info = {
          degrees: flight.true_track,
          latitude: flight.latitude,
          longitude: flight.longitude,
          velocity: flight.velocity,
          altitude: flight.altitude,
        };

        planeInfo?.setAttribute('info', JSON.stringify(info));
      });
    i++;
  });
};
