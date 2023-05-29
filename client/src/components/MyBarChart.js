import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const MyBarChart = ({ data }) => {
 
  const formattedData = data.map((entry) => ({
    ...entry,
    [entry.type]: entry.value, 
  }));

  return (
    <BarChart width={600} height={300} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" fill="#32CD32" /> 
      <Bar dataKey="expenses" fill="#FF0000" /> 
    </BarChart>
  );
};

export default MyBarChart;