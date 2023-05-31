import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Button, Form } from 'react-bootstrap';
import { ADD_EXPENSE, RESET_EXPENSE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import 'animate.css/animate.min.css';

const AddExpenseForm = () => {
  const [formState, setFormState] = useState({ description: '', amount: '', date: '' });
  const [addExpense, { error }] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: QUERY_ME }], 
  });

  const [resetExpense, { error: resetError }] = useMutation(RESET_EXPENSE, {
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

  const handleResetExpense = async () => {
    try {
      await resetExpense();
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
    <Card className="mt-3 animate__animated animate__fadeIn">
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" name="description" value={formState.description} onChange={handleChange} placeholder="Description" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control type="number" name="amount" value={formState.amount} onChange={handleChange} placeholder="Amount" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control type="date" name="date" value={formState.date} onChange={handleChange} placeholder="Date" />
          </Form.Group>
          <Button type="submit">Submit</Button>
          <Button variant="danger" onClick={handleResetExpense}>Reset Expenses</Button>
        </Form>
        {error && <div>Expense addition failed</div>}
        {resetError && <div>Expense reset failed</div>}
      </Card.Body>
    </Card>
  );
};

export default AddExpenseForm;