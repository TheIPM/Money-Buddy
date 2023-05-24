import React, { useState, useEffect } from 'react'; 
import { useMutation } from '@apollo/client';
import { CREATE_GOAL } from '../utils/mutations';
import { Container, Card, Form, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';

const GoalForm = () => {
  const [goal, setGoal] = useState({
    description: '',
    targetAmount: '',
    targetDate: '',
  });

  const [addedGoal, setAddedGoal] = useState(null);  // new state for added goal

  const [createGoal, { error: goalError }] = useMutation(CREATE_GOAL);

  const handleChange = (e) => {
    let value = e.target.value;

    // ensure targetAmount is a number
    if (e.target.name === "targetAmount") {
      value = parseFloat(e.target.value);
    }

    setGoal({ ...goal, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // check that all fields have been filled in
    for (let field in goal) {
      if (goal[field] === '') {
        console.error(`Invalid input: ${field} is empty`);
        return;
      }
    }
  
    // check that targetAmount is a valid number
    if (isNaN(goal.targetAmount)) {
      console.error("Invalid targetAmount");
      return;
    }
  
    try {
      const { data } = await createGoal({ variables: { ...goal } });
      setGoal({ description: '', targetAmount: '', targetDate: '' });
      setAddedGoal(data.addGoal);  // update the addedGoal state
    } catch (error) {
      console.error(error);
    }
  };

  // render error message if there is an error
  if (goalError) {
    return <p>Error! {goalError.message}</p>;
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2>Goal Form</h2>
      <Form onSubmit={handleSubmit}>
  
        <Form.Group controlId="formGoalDescription">
          <Form.Label>Goal Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={goal.description}
            onChange={handleChange}
            placeholder="Goal description"
          />
        </Form.Group>
        <Form.Group controlId="formGoalTargetAmount">
          <Form.Label>Target Amount</Form.Label>
          <Form.Control
            type="number"
            name="targetAmount"
            value={goal.targetAmount}
            onChange={handleChange}
            placeholder="Target amount"
          />
        </Form.Group>
        <Form.Group controlId="formGoalTargetDate">
          <Form.Label>Target Date</Form.Label>
          <Form.Control
            type="date"
            name="targetDate"
            value={goal.targetDate}
            onChange={handleChange}
            placeholder="Target date"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Goal
        </Button>
      </Form>
    

      {addedGoal && (
        <Card className="mt-3 animate__animated animate__fadeIn">
          <Card.Body>
            <Card.Title>Added Goal</Card.Title>
            <Card.Text>Description: {addedGoal.description}</Card.Text>
            <Card.Text>Target Amount: {addedGoal.targetAmount}</Card.Text>
            <Card.Text>Target Date: {new Date(parseInt(addedGoal.targetDate)).toLocaleDateString()}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
);
};

export default GoalForm;