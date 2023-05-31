import React, { useState } from 'react'; 
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_GOAL } from '../utils/mutations';
import { QUERY_USER_GOALS } from '../utils/queries';
import { Card, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';

const UserGoals = ({ userId }) => {
  const [showGoals, setShowGoals] = useState(false);
  const [deleteGoal, { error: deleteError }] = useMutation(DELETE_GOAL);

  const { loading, error, data } = useQuery(QUERY_USER_GOALS, { 
    variables: { userId: userId } 
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || deleteError) {
    console.error(error || deleteError);
    return <p>Error fetching user's goals</p>;
  }

  const calculateDaysUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(parseInt(dueDate));
    const differenceInTime = due.getTime() - now.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div>
      <Button onClick={() => setShowGoals(!showGoals)}>
        {showGoals ? 'Hide Existing Goals' : 'Show Existing Goals'}
      </Button>

      {showGoals && data.userGoals.map(goal => (
        <Card className="mt-3 animate__animated animate__fadeIn" key={goal._id}>
          <Card.Body>
            <Card.Title>Existing Goal</Card.Title>
            <Card.Text>Description: {goal.description}</Card.Text>
            <Card.Text>Target Amount: {goal.targetAmount}</Card.Text>
            <Card.Text>Target Date: {new Date(parseInt(goal.targetDate)).toLocaleDateString()}</Card.Text>
            <Card.Text>Days until target date: {calculateDaysUntilDue(goal.targetDate)}</Card.Text>
            <Button variant="danger" onClick={async () => {
              try {
                await deleteGoal({ 
                  variables: { goalId: goal._id },
                  refetchQueries: [{ query: QUERY_USER_GOALS, variables: { userId: userId } }] 
                });
              } catch (error) {
                console.error(error);
              }
            }}>Delete Goal</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserGoals;