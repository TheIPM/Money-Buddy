import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'animate.css/animate.min.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const MyPieChart = () => {
  const [data, setData] = useState([
    { name: 'Expenses', value: 100 },
    { name: 'Income', value: 200 },
    { name: 'Investments', value: 300 },
  ]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...data];
    list[index].value = Number(value);
    setData(list);
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2>Your Financial Overview</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend/>
      </PieChart>
      {data.map((item, index) => (
        <Form.Group controlId={`formValue${index}`} key={index}>
          <Form.Label>{item.name}</Form.Label>
          <Form.Control
            type="number"
            value={item.value}
            onChange={(e) => handleInputChange(e, index)}
          />
        </Form.Group>
      ))}
      <Button variant="primary" onClick={() => setData([
        { name: 'Expenses', value: 0 },
        { name: 'Income', value: 0 },
        { name: 'Investments', value: 0 },
      ])}>Reset</Button>
    </Container>
  );
};

export default MyPieChart;