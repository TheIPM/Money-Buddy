import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Table } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { fromUnixTime, format } from 'date-fns';
import 'animate.css/animate.min.css';

const IncomeDetails = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.me || !data.me.income) {
    return <div>No income data found for the user</div>;
  }

  const { income } = data.me;

  return (
    <Card className="mt-3 animate__animated animate__fadeIn">
      <Card.Body>
        <Card.Title>Income Entries</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {income.map((incomeItem, i) => {
              const date = fromUnixTime(incomeItem.date / 1000);
              const dateString = format(date, 'MM/dd/yyyy');
              return (
                <tr key={i}>
                  <td>{incomeItem.description}</td>
                  <td>{incomeItem.amount}</td>
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

export default IncomeDetails;