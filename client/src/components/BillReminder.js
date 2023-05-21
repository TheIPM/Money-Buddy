import React, { useState, useEffect } from 'react'; 
import { useMutation } from '@apollo/client';
import { CREATE_BILL_REMINDER } from '../utils/mutations';
import AuthService from '../utils/auth'; 

const BillReminderForm = () => {
  const [userProfile, setUserProfile] = useState(null);
  
  useEffect(() => {
    setUserProfile(AuthService.getProfile());
  }, []);

  const [billReminder, setBillReminder] = useState({
    userId: '',
    name: '',
    dueDate: '',
    amount: '',
});

  useEffect(() => {
    if (userProfile) {
      setBillReminder((prevBillReminder) => ({ ...prevBillReminder, userId: userProfile._id }));
    }
  }, [userProfile]);

  const [createBillReminder, { error: billReminderError }] = useMutation(CREATE_BILL_REMINDER);

  const handleChange = (e) => {
    setBillReminder({ ...billReminder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBillReminder({ variables: { ...billReminder } });
      setBillReminder({ userId: userProfile._id, name: '', dueDate: '', amount: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // render error message if there is an error
  if (billReminderError) {
    return <p>Error! {billReminderError.message}</p>;
  }

  return (
    <div>
      <h2>Bill Reminder Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={billReminder.name}
          onChange={handleChange}
          placeholder="Bill name"
        />
        <input
          type="date"
          name="dueDate"
          value={billReminder.dueDate}
          onChange={handleChange}
          placeholder="Due date"
        />
        <input
          type="number"
          name="amount"
          value={billReminder.amount}
          onChange={handleChange}
          placeholder="Bill amount"
        />
        <button type="submit">Add Bill Reminder</button>
      </form>
    </div>
  );
};

export default BillReminderForm;