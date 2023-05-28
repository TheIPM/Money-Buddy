import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Container, Form, Button } from 'react-bootstrap';
import MyBarChart from './MyBarChart';
import 'animate.css/animate.min.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB', '#FFD700', '#FF1493', '#DAA520', '#8B008B', '#32CD32'];

const initialData = {
  income: {
    Salary: 0,
    Gifts: 0,
    'Other Income': 0,
  },
  expenses: {
    Groceries: 0,
    Bills: 0,
    Entertainment: 0,
    'Other Expenses': 0,
  },
};

const MyPieChart = () => {
  const [data, setData] = useState(initialData);
  const [temporaryData, setTemporaryData] = useState(initialData); 
  const [selectedIncome, setSelectedIncome] = useState('Salary');
  const [selectedExpense, setSelectedExpense] = useState('Groceries');

  const handleSelectChange = (e, type) => {
    if (type === 'income') {
      setSelectedIncome(e.target.value);
    } else {
      setSelectedExpense(e.target.value);
    }
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    const name = type === 'income' ? selectedIncome : selectedExpense;
    setTemporaryData({ ...temporaryData, [type]: { ...temporaryData[type], [name]: Number(value) } }); 
  };

  const handleSubmit = (type) => {
    setData({ ...data, [type]: temporaryData[type] });
  }

  const combinedData = [
    ...Object.entries(data.income).map(([name, value]) => ({ name, value })),
    ...Object.entries(data.expenses).map(([name, value]) => ({ name, value })),
  ];

  // Calculate total income and total expenses
  const totalIncome = Object.values(data.income).reduce((acc, val) => acc + val, 0);
  const totalExpenses = Object.values(data.expenses).reduce((acc, val) => acc + val, 0);

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2>Your Financial Overview</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={combinedData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {combinedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      
      <MyBarChart data={[{ name: 'Income', value: totalIncome, type: 'income' }, { name: 'Expenses', value: totalExpenses, type: 'expenses' }]} />

      <h3>Income</h3>
      <Form.Control
        as="select"
        value={selectedIncome}
        onChange={(e) => handleSelectChange(e, 'income')}
      >
        {Object.keys(initialData.income).map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </Form.Control>
      <Form.Group controlId="formIncomeValue">
        <Form.Label>{selectedIncome}</Form.Label>
        <Form.Control
          type="number"
          value={temporaryData.income[selectedIncome]} 
          onChange={(e) => handleInputChange(e, 'income')}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={() => handleSubmit('income')}
      >
        Submit Income
      </Button>

      <h3>Expenses</h3>
      <Form.Control
        as="select"
        value={selectedExpense}
        onChange={(e) => handleSelectChange(e, 'expenses')}
      >
        {Object.keys(initialData.expenses).map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </Form.Control>
      <Form.Group controlId="formExpenseValue">
        <Form.Label>{selectedExpense}</Form.Label>
        <Form.Control
          type="number"
          value={temporaryData.expenses[selectedExpense]} 
          onChange={(e) => handleInputChange(e, 'expenses')}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={() => handleSubmit('expenses')}
      >
        Submit Expenses
      </Button>

      <Button
        variant="secondary"
        onClick={() => setTemporaryData({ ...initialData })}
      >
        Reset Data
      </Button>
    </Container>
  );
};

export default MyPieChart;