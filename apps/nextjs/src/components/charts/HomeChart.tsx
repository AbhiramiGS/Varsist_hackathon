"use client"
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page H',
    uv: 2800,
    pv: 3500,
    amt: 1900,
  },
  {
    name: 'Page I',
    uv: 3200,
    pv: 2800,
    amt: 2400,
  },
  {
    name: 'Page J',
    uv: 4100,
    pv: 3200,
    amt: 2700,
  },
  {
    name: 'Page K',
    uv: 2500,
    pv: 4500,
    amt: 2200,
  },
  {
    name: 'Page L',
    uv: 3200,
    pv: 3800,
    amt: 2000,
  },
  {
    name: 'Page M',
    uv: 2800,
    pv: 3100,
    amt: 2300,
  },
  {
    name: 'Page N',
    uv: 3500,
    pv: 2700,
    amt: 2500,
  },
  {
    name: 'Page O',
    uv: 4200,
    pv: 3500,
    amt: 2600,
  },
  {
    name: 'Page P',
    uv: 3800,
    pv: 2800,
    amt: 2900,
  },
  {
    name: 'Page Q',
    uv: 2900,
    pv: 3900,
    amt: 2100,
  },
  {
    name: 'Page R',
    uv: 3200,
    pv: 4100,
    amt: 2300,
  },
  {
    name: 'Page S',
    uv: 3900,
    pv: 3200,
    amt: 2700,
  },
  {
    name: 'Page T',
    uv: 3500,
    pv: 2800,
    amt: 2400,
  },
  {
    name: 'Page U',
    uv: 4200,
    pv: 3300,
    amt: 2600,
  },
  {
    name: 'Page V',
    uv: 3800,
    pv: 2700,
    amt: 2900,
  },
  {
    name: 'Page W',
    uv: 2900,
    pv: 3900,
    amt: 2100,
  },
  {
    name: 'Page X',
    uv: 3200,
    pv: 4100,
    amt: 2300,
  },
  {
    name: 'Page Y',
    uv: 3900,
    pv: 3200,
    amt: 2700,
  },
  {
    name: 'Page Z',
    uv: 3500,
    pv: 2800,
    amt: 2400,
  },
];

const HomeChart = () => {
 
    return (
      
      
        <LineChart width={300} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      
    );
  
}

export default HomeChart;

