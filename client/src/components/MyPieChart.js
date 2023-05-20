import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

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
    <div>
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
        <div key={index}>
          <label>{item.name}</label>
          <input
            type="number"
            value={item.value}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      ))}
      <button onClick={() => setData([
        { name: 'Expenses', value: 0 },
        { name: 'Income', value: 0 },
        { name: 'Investments', value: 0 },
      ])}>Reset</button>
    </div>
  );
};

export default MyPieChart;