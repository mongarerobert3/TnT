import axios from 'axios';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export const fetchData = async (url, setFunction, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(url, config);
    const data = response.data;
    setFunction(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchTrips = async (setTrips, token) => {
  const url = 'http://localhost:5000/api/tour';
  await fetchData(url, setTrips, token);
};

export const fetchDoneTrips = async (setDoneTrips, token) => {
  const id = localStorage.getItem('userId')
  const url = `http://localhost:5000/api/bookings/count/${id}`;
  await fetchData(url, setDoneTrips, token);
};

export const fetchCanceledTrips = async (setCanceledTrips, token) => {
  const url = 'http://localhost:5000/api/canceled-trips'; // Update with the appropriate API endpoint for canceled trips
  await fetchData(url, setCanceledTrips, token);
};

export const fetchSpentMoney = async (setSpentMoney, token) => {
  const url = 'http://localhost:5000/api/spent-money'; // Update with the appropriate API endpoint for spent money
  await fetchData(url, setSpentMoney, token);
};
