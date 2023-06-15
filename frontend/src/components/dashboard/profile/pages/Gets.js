import axios from "axios";

export const fetchBookings = async (url, setBookedTrips, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(url, config);
    const data = response.data;
    setBookedTrips(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Get All bookings for a user
export const UserBookings = async (setDoneTrips, token) => {
  const id = localStorage.getItem('userId')
  const url = `http://localhost:5000/api/booking/trips/${id}`;
  await fetchBookings(url, setDoneTrips, token);
};
