import React, { useState, useEffect } from 'react'; 
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_GOAL, DELETE_GOAL } from '../utils/mutations';
import { QUERY_USER_GOALS } from '../utils/queries';
import { Container, Card, Form, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';
import Auth from '../utils/auth';

const GoalForm = () => {
  const [goal, setGoal] = useState({
    description: '',
    targetAmount: '',
    targetDate: '',
  });

  const [addedGoal, setAddedGoal] = useState(null);  

  const [createGoal, { error: goalError }] = useMutation(CREATE_GOAL, {
    refetchQueries: [{ query: QUERY_USER_GOALS, variables: { userId: Auth.getProfile().data._id } }],
  });
  const [deleteGoalMutation, { error: deleteGoalError }] = useMutation(DELETE_GOAL);

  const { loading, error, data } = useQuery(QUERY_USER_GOALS, { 
    variables: { userId: Auth.getProfile().data._id } 
  });

  useEffect(() => {
    if (!loading && data && data.user) {

      if (data.user.goals.length > 0) {
        setGoal(data.user.goals[0]);
      }
    }
  }, [loading, data]);

  const handleChange = (e) => {
    let value = e.target.value;
     
    if (e.target.name === "targetAmount") {
      value = parseFloat(e.target.value);
    }

    setGoal({ ...goal, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (let field in goal) {
      if (goal[field] === '') {
        console.error(`Invalid input: ${field} is empty`);
        return;
      }
    }
  
    if (isNaN(goal.targetAmount)) {
      console.error("Invalid targetAmount");
      return;
    }
  
    try {
      const { data } = await createGoal({ variables: { userId: Auth.getProfile().data._id, ...goal } });
      setGoal({ description: '', targetAmount: '', targetDate: '' });
      setAddedGoal(data.addGoal);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!addedGoal) return;
    
    try {
      await deleteGoalMutation({ variables: { userId: Auth.getProfile().data._id, goalId: addedGoal._id } });
      setAddedGoal(null);
    } catch (error) {
      console.error(error);
    }
  };
 
  if (goalError || deleteGoalError) {
    return <p>Error! {goalError?.message || deleteGoalError?.message}</p>;
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
            <Button variant="danger" onClick={handleDelete}>Delete Goal</Button>
          </Card.Body>
        </Card>
      )}

      {!loading && data && data.user && data.user.goals.map(goal => (
        <Card className="mt-3 animate__animated animate__fadeIn">
          <Card.Body>
            <Card.Title>Existing Goal</Card.Title>
            <Card.Text>Description: {goal.description}</Card.Text>
            <Card.Text>Target Amount: {goal.targetAmount}</Card.Text>
            <Card.Text>Target Date: {new Date(parseInt(goal.targetDate)).toLocaleDateString()}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default GoalForm;