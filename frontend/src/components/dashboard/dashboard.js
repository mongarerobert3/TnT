import axios from 'axios';

export function fetchTrips(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get('http://localhost:5000/api/tour', config)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching upcoming trips:', error);
      return [];
    });
}
