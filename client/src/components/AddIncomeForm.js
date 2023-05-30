import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_INCOME } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

function AddIncomeForm() {
    const [addIncome, { error }] = useMutation(ADD_INCOME, {
        refetchQueries: [{ query: QUERY_ME }],
        })
  
  const [incomeData, setIncomeData] = useState({
    amount: '',
    date: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addIncome({ variables: { ...incomeData, amount: parseFloat(incomeData.amount) } });
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input name="amount" type="number" value={incomeData.amount} onChange={handleChange} required />
      </label>
      <label>
        Date:
        <input name="date" type="date" value={incomeData.date} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input name="description" type="text" value={incomeData.description} onChange={handleChange} required />
      </label>
      <button type="submit">Add Income</button>
      {error && <p>Error adding income: {error.message}</p>}
    </form>
  );
}

export default AddIncomeForm;