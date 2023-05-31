import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER_BILL_REMINDERS } from '../utils/queries';
import { DELETE_BILL_REMINDER } from '../utils/mutations';
import { Card, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';

const UserBills = ({ userId }) => {
  const { loading, data } = useQuery(QUERY_USER_BILL_REMINDERS, {
    variables: { userId },
  });
  
  const [deleteBillReminder] = useMutation(DELETE_BILL_REMINDER);
  
  const [showBills, setShowBills] = useState(false);

  const handleClick = async (billId) => {
    try {
      await deleteBillReminder({ variables: { billReminderId: billId } });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
      <Button onClick={() => setShowBills(!showBills)}>
        {showBills ? 'Hide Bill Reminders' : 'Show Bill Reminders'}
      </Button>

      {showBills && data && data.userBillReminders && data.userBillReminders.map((bill) => (
        <Card className="mt-3 animate__animated animate__fadeIn" key={bill._id}>
          <Card.Body>
            <Card.Title>Bill Reminder</Card.Title>
            <Card.Text>Name: {bill.name}</Card.Text>
            <Card.Text>Amount: {bill.amount}</Card.Text>
            <Card.Text>Due Date: {new Date(parseInt(bill.dueDate)).toLocaleDateString()}</Card.Text>
            <Card.Text>Days until due: {calculateDaysUntilDue(bill.dueDate)}</Card.Text>
            <Button variant="danger" onClick={() => handleClick(bill._id)}>Delete Bill Reminder</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserBills;