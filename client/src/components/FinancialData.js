import React from 'react';
import { useQuery } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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

  const totalIncome = income.reduce((acc, incomeItem) => acc + incomeItem.amount, 0);
  const totalExpenses = expenses.reduce((acc, expenseItem) => acc + expenseItem.amount, 0);
  const balance = totalIncome - totalExpenses; 

  const financialData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
  ];

  const balanceColor = balance < 0 ? 'red' : 'green';

  return (
    <div>
      <h2 style={{ color: balanceColor }}>Your Balance is: ${balance}</h2> 
      <BarChart
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
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default FinancialData;