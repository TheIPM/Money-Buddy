import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Card, Table } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { fromUnixTime, format } from 'date-fns';
import 'animate.css/animate.min.css';

const ExpenseDetails = () => {
  const { loading, data } = useQuery(QUERY_ME);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.me || !data.me.expenses) {
    return <div>No expenses data found for the user</div>;
  }

  const { expenses } = data.me;

  const exportToCSV = () => {
    let csvContent = 'Description,Amount,Date\n'; // column headers
    expenses.forEach((expenseItem) => {
      const date = fromUnixTime(expenseItem.date / 1000);
      const dateString = format(date, 'MM/dd/yyyy');
      csvContent += `${expenseItem.description},${expenseItem.amount},${dateString}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mt-3 animate__animated animate__fadeIn">
      <Card.Body>
        <Card.Title>Expense Entries</Card.Title>
        <Button onClick={exportToCSV} variant="primary" className="mb-2">Download CSV</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expenseItem, i) => {
              const date = fromUnixTime(expenseItem.date / 1000);
              const dateString = format(date, 'MM/dd/yyyy');
              return (
                <tr key={i}>
                  <td>{expenseItem.description}</td>
                  <td>{expenseItem.amount}</td>
                  <td>{dateString}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseDetails;
