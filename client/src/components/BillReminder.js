import React, { useState } from 'react'; 
import { useMutation } from '@apollo/client';
import { CREATE_BILL_REMINDER } from '../utils/mutations'; 
import { Container, Card, Form, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';

const BillReminderForm = () => {
  const [billReminder, setBillReminder] = useState({
    name: '',
    dueDate: '',
    amount: '',
  });

  const [createBillReminder, { data: addedBillReminder, error: billReminderError }] = useMutation(CREATE_BILL_REMINDER);

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "amount") {
      value = parseFloat(e.target.value);
    }

    setBillReminder({ ...billReminder, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (let field in billReminder) {
      if (billReminder[field] === '') {
        console.error(`Invalid input: ${field} is empty`);
        return;
      }
    }
  
    if (isNaN(billReminder.amount)) {
      console.error("Invalid amount");
      return;
    }
  
    try {
      await createBillReminder({ variables: { ...billReminder } });
      setBillReminder({ name: '', dueDate: '', amount: '' });
    } catch (error) {
      console.error(error);
    }
  };

  if (billReminderError) {
    return <p>Error! {billReminderError.message}</p>;
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2>Bill Reminder Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBillName">
          <Form.Label>Bill Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={billReminder.name}
            onChange={handleChange}
            placeholder="Bill name"
          />
        </Form.Group>
        <Form.Group controlId="formBillDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={billReminder.dueDate}
            onChange={handleChange}
            placeholder="Due date"
          />
        </Form.Group>
        <Form.Group controlId="formBillAmount">
          <Form.Label>Bill Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={billReminder.amount}
            onChange={handleChange}
            placeholder="Bill amount"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Bill Reminder
        </Button>
      </Form>
      {addedBillReminder && (
        <Card className="mt-3 animate__animated animate__fadeIn">
          <Card.Body>
            <Card.Title>Added Bill Reminder</Card.Title>
            <Card.Text>Name: {addedBillReminder.addBillReminder.name}</Card.Text>
            <Card.Text>Due Date: {new Date(parseInt(addedBillReminder.addBillReminder.dueDate)).toLocaleDateString()}</Card.Text>
            <Card.Text>Amount: {addedBillReminder.addBillReminder.amount}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BillReminderForm;