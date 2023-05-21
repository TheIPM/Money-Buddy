import React, { useState, useEffect } from 'react'; 
import MyPieChart from './MyPieChart';
import { useMutation } from '@apollo/client';
import { CREATE_GOAL } from '../utils/mutations';
import AuthService from '../utils/auth'; 

const GoalForm = () => {
  const [userProfile, setUserProfile] = useState(null);
  
  useEffect(() => {
    setUserProfile(AuthService.getProfile());
  }, []);

  const [goal, setGoal] = useState({
    userId: '',
    description: '',
    targetAmount: '',
    targetDate: '',
});

  useEffect(() => {
    if (userProfile) {
      setGoal((prevGoal) => ({ ...prevGoal, userId: userProfile._id }));
    }
  }, [userProfile]);

  const [createGoal, { error: goalError }] = useMutation(CREATE_GOAL);

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGoal({ variables: { ...goal } });
      setGoal({ userId: userProfile._id, description: '', targetAmount: '', targetDate: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // render error message if there is an error
  if (goalError) {
    return <p>Error! {goalError.message}</p>;
  }

  return (
    <div>
      <h2>Goal Form</h2>
      <form onSubmit={handleSubmit}>  
        <input
          type="text"
          name="description"
          value={goal.description}
          onChange={handleChange}
          placeholder="Goal description"
        />
        <input
          type="number"
          name="targetAmount"
          value={goal.targetAmount}
          onChange={handleChange}
          placeholder="Target amount"
        />
        <input
          type="date"
          name="targetDate"
          value={goal.targetDate}
          onChange={handleChange}
          placeholder="Target date"
        />
        <button type="submit">Add Goal</button>
      </form>
      <MyPieChart />
    </div>
  );
};

export default GoalForm;