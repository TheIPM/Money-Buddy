import React, { useState } from 'react'; 
import { useMutation } from '@apollo/client';
import { CREATE_BILL_REMINDER } from '../utils/mutations'; 

const BillReminderForm = () => {
  const [billReminder, setBillReminder] = useState({
    name: '',
    description: '', 
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
      setBillReminder({ name: '', description: '', dueDate: '', amount: '' });
    } catch (error) {
      console.error(error);
    }
  };

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
          type="text"
          name="description"
          value={billReminder.description}
          onChange={handleChange}
          placeholder="Description"
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
      {addedBillReminder && (  // new div for displaying the added bill reminder
        <div>
          <h2>Added Bill Reminder</h2>
          <p>Name: {addedBillReminder.addBillReminder.name}</p>
          <p>Description: {addedBillReminder.addBillReminder.description}</p>
          <p>Due Date: {new Date(parseInt(addedBillReminder.addBillReminder.dueDate)).toLocaleDateString()}</p>
          <p>Amount: {addedBillReminder.addBillReminder.amount}</p>
        </div>
      )}
    </div>
  );
};

export default BillReminderForm;