import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const DataVisualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the local dummy.json file
    fetch('/dummy.json')
      .then((response) => response.json())
      .then((data) => {
        const monthlySalesData = data.data.monthlySales.map((item:any) => ({
          name: item.month,
          value: item.sales,
        }));
        setData(monthlySalesData);
      })
      .catch((error) => console.error("Error loading the data:", error));
  }, []);

  return (
    <div>
      <h2>Data Visualization</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Line Chart */}
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>

        {/* Bar Chart */}
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default DataVisualization;
