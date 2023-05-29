import axios from 'axios';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export async function fetchTrips(setTrips, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('http://localhost:5000/api/tour', config);
    const data = response.data;
    setTrips(data);
  } catch (error) {
    console.error('Error fetching upcoming trips:', error);
  }
}
