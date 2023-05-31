import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Table } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { fromUnixTime, format } from 'date-fns';
import 'animate.css/animate.min.css';


const ExpenseDetails = () => {
    const { loading, data } = useQuery(QUERY_ME);
    console.log(data);  
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!data || !data.me || !data.me.expenses) {
      return <div>No expenses data found for the user</div>;
    }
  
    const { expenses } = data.me;
  
    return (
        <Card className="mt-3 animate__animated animate__fadeIn">
          <Card.Body>
            <Card.Title>Expense Entries</Card.Title>
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