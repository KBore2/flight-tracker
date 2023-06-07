import axios from 'axios';
import { Flight } from '../types/flightType';

const url = 'https://opensky-network.org/api';

const getItem = (deperatingFrom: string) => {
  if (typeof Storage === undefined) return null;

  const cache = sessionStorage.getItem('flights');
  //console.log(cache);
  if (cache === null) return null;

  const response = JSON.parse(cache as string);
  if (Date.now() > (response.time + 660) * 1000) return null;

  let flights: Flight[] = response.states
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
      (f) => f.origin_country.toLowerCase() === deperatingFrom.toLowerCase()
    );

  //console.log(flights);
  return flights.slice(0, 50);
};

export const getFlights = async (deperatingFrom = '') => {
  const flights = getItem(deperatingFrom);
  console.log(flights);
  if (flights) return new Promise<Flight[]>((resolve) => resolve(flights));

  console.log('missed');

  const promise = axios({
    method: 'get',
    url: `${url}/states/all`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (typeof Storage !== undefined) {
        sessionStorage.setItem('flights', JSON.stringify(response.data));
      }

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
          (f) => f.origin_country.toLowerCase() === deperatingFrom.toLowerCase()
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
