import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Button, Form } from 'react-bootstrap';
import { ADD_INCOME, RESET_INCOME } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import 'animate.css/animate.min.css';

function AddIncomeForm() {
  const [addIncome, { error }] = useMutation(ADD_INCOME, {
    refetchQueries: [{ query: QUERY_ME }],
  });
  
  const [resetIncome, { error: resetError }] = useMutation(RESET_INCOME, {
    refetchQueries: [{ query: QUERY_ME }],
  });

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

  const handleResetIncome = async () => {
    try {
      await resetIncome();
    } catch (error) {
      console.error('Error resetting income:', error);
    }
  };

  return (
    <Card className="mt-3 animate__animated animate__fadeIn">
      <Card.Body>
        <Card.Title>Add Income</Card.Title>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control name="description" type="text" value={incomeData.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control name="amount" type="number" value={incomeData.amount} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control name="date" type="date" value={incomeData.date} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit">Add Income</Button>
          <Button variant="danger" onClick={handleResetIncome}>Reset Income</Button>
        </Form>
        {error && <p>Error adding income: {error.message}</p>}
        {resetError && <p>Error resetting income: {resetError.message}</p>}
      </Card.Body>
    </Card>
  );
}

export default AddIncomeForm;