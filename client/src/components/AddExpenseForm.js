import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
const AddExpenseForm = () => {
  const [formState, setFormState] = useState({ description: '', amount: '', date: '' });
  const [addExpense, { error }] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: QUERY_ME }], 
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addExpense({
        variables: {
          ...formState,
          amount: parseFloat(formState.amount),
        },
      });
      console.log(data);
      setFormState({
        description: '',
        amount: '',
        date: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <h4>Add Expense</h4>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formState.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formState.date}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div>Expense addition failed</div>}
    </div>
  );
};

export default AddExpenseForm;