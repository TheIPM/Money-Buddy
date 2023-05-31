import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Card, Table } from 'react-bootstrap';
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

  const exportToCSV = () => {
    let csvContent = 'Description,Amount,Date\n'; // column headers
    income.forEach((incomeItem) => {
      const date = fromUnixTime(incomeItem.date / 1000);
      const dateString = format(date, 'MM/dd/yyyy');
      csvContent += `${incomeItem.description},${incomeItem.amount},${dateString}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'income.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mt-3 animate__animated animate__fadeIn">
      <Card.Body>
        <Card.Title>Income Entries</Card.Title>
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