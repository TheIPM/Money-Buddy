import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const MyBarChart = ({ data }) => {

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {data.map((entry, index) => (
        <Bar key={index} dataKey="value" fill={entry.type === 'income' ? '#32CD32' : '#FF0000'} />
      ))}
    </BarChart>
  );
};

export default MyBarChart;