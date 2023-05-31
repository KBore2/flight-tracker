import axios from 'axios';

const url = 'https://opensky-network.org/api';

export const getFlights = async (deperatingFrom = null) => {
  const promise = axios({
    method: 'get',
    url: `${url}/states/all`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      let flights = response.data.states
        .map(
          (flight) =>
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
        .filter((f) => f.lat !== null && f.longitude !== null);

      if (deperatingFrom)
        flights = flights.filter(
          (f) => f.origin_country.toLowerCase() === deperatingFrom.toLowerCase()
        );

      console.log(flights);
      return flights.slice(0, 50);
    })
    .catch((err) => console.error(err));

  return promise;
};
