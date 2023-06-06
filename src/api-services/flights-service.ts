import axios from 'axios';
import { Flight } from '../types/flightType';

const url = 'https://opensky-network.org/api';

export const getFlights = async (deperatingFrom: string = '') => {
  const promise = axios({
    method: 'get',
    url: `${url}/states/all`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      let flights: Flight[] = response.data.states
        .map(
          (flight: any) =>
            (flight = {
              icao24: flight[0],
              origin_country: flight[2],
              longitude: flight[5],
              latitude: flight[6],
              velocity: flight[9],
              true_track: flight[10],
              altitude: flight[13],
            })
        )
        .filter((f: any) => f.lat !== null && f.longitude !== null);

      if (deperatingFrom !== '')
        flights = flights.filter(
          (f: any) =>
            f.origin_country.toLowerCase() === deperatingFrom.toLowerCase()
        );

      console.log(flights);
      return flights.slice(0, 50);
    })
    .catch((err) => {
      console.error(err);
      const emptyFlights: Flight[] = [];
      return emptyFlights;
    });

  return promise;
};
