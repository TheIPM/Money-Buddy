import React from 'react';
import { useQuery } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { QUERY_ME } from '../utils/queries';

const FinancialData = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.me || !data.me.income || !data.me.expenses) {
    return <div>No income or expenses data found for the user</div>;
  }

  const { income, expenses } = data.me;

  const financialData = income.map((incomeItem, i) => ({
    name: `Entry ${i + 1}`,
    income: incomeItem.amount,
    expenses: expenses[i] ? expenses[i].amount : 0,
  }));

  return (
    <LineChart
      width={500}
      height={300}
      data={financialData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
    </LineChart>
  );
};

export default FinancialData;