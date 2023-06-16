import React from 'react';
import { LineChart, Line } from 'recharts';

const BookingCharts = () => {
  const previousMonthData = [
    // No of bookings for the previous month
    { x: 1, y: 5 },
    { x: 2, y: 8 },
  ];
  
  const currentMonthData = [
    // No of bookings for the previous month
    { x: 1, y: 7 },
    { x: 2, y: 6 },
  ];
  
  return (
    <LineChart width={400} height={300}>
      <Line data={previousMonthData} type="monotone" stroke="#8884d8" strokeWidth={2} dot={false} />
      <Line data={currentMonthData} type="monotone" stroke="#82ca9d" strokeWidth={2} dot={false} />
    </LineChart>
  );
};

export default BookingCharts;
