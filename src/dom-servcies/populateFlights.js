/* eslint-disable no-undef */
import plane from '../assets/plane.png';
import 'leaflet-rotatedmarker';

export const populateMap = (flights, layerGroup) => {
  layerGroup.clearLayers();

  let i = 0;
  flights.forEach((flight) => {
    const planeIcon = L.icon({
      iconUrl: plane,
      //shadowUrl: 'leaf-shadow.png',

      iconSize: [30, 30], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    //console.log('lat: ', i, flight.latitude);
    L.marker([flight.latitude, flight.longitude], {
      icon: planeIcon,
      rotationAngle: flight.true_track,
    })
      .addTo(layerGroup)
      .on('click', (e) => {
        console.log(`icao24: ${flight.icao24}, latlong: ${e.latlng}`);

        const planeInfo = document.querySelector('plane-info');
        console.log(flight.true_track.toString());
        planeInfo.setAttribute('degrees', `${flight.true_track}`);
      });
    i++;
  });
};
