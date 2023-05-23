import React, { useState, useEffect } from 'react'; 
import MyPieChart from './MyPieChart';
import { useMutation } from '@apollo/client';
import { CREATE_GOAL } from '../utils/mutations';
import AuthService from '../utils/auth'; 

const GoalForm = () => {
  const [goal, setGoal] = useState({
    description: '',
    targetAmount: '',
    targetDate: '',
    title: '', 
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
      setGoal({ description: '', targetAmount: '', targetDate: '', title: '' });
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
    <div>
      <h2>Goal Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={goal.title}
          onChange={handleChange}
          placeholder="Goal title"
        />
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

      {addedGoal && (  
        <div>
          <h2>Added Goal</h2>
          <p>Title: {goal.title}</p>
          <p>Description: {addedGoal.description}</p>
          <p>Target Amount: {addedGoal.targetAmount}</p>
          <p>Target Date: {new Date(parseInt(addedGoal.targetDate)).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default GoalForm;