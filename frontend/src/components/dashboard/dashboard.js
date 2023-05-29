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

export function prevSlide(currentIndex, setCurrentIndex, trips) {
  setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : trips.length - 1));
}

export function nextSlide(currentIndex, setCurrentIndex, trips) {
  setCurrentIndex((prevIndex) => (prevIndex < trips.length - 1 ? prevIndex + 1 : 0));
}
