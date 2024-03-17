"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { api } from "~/trpc/react";

interface Props {
  width: number;
  height: number;
  className?: string;
  minWidth: number;
  minHeight: number;
}

const Overview = (props: Props) => {
  const { data: phData } = api.spring.findAllPh.useQuery();
  const { data: tempData } = api.spring.findAllTemperature.useQuery();
  const { data: turbidData } = api.spring.findAllTurbidity.useQuery();
  const { data: doData } = api.spring.findAllDO.useQuery();
  const { data: waterData } = api.spring.findAllWaterFlow.useQuery();

  const data = [
    {
      date: "2021-01-01",
      ph: phData?.[0]?.pH,
      temperature: tempData?.[0]?.temperature,
      turbidity: turbidData?.[0]?.turbidity,
      dissolvedOxygen: doData?.[0]?.dissolved_oxygen,
      waterFlow: waterData?.[0]?.water_flow,
    },
    {
      date: "2021-01-02",
      ph: phData?.[1]?.pH,
      temperature: tempData?.[1]?.temperature,
      turbidity: turbidData?.[1]?.turbidity,
      dissolvedOxygen: doData?.[1]?.dissolved_oxygen,
      waterFlow: waterData?.[1]?.water_flow,
    },
    {
      date: "2021-01-03",
      ph: phData?.[2]?.pH,
      temperature: tempData?.[2]?.temperature,
      turbidity: turbidData?.[2]?.turbidity,
      dissolvedOxygen: doData?.[2]?.dissolved_oxygen,
      waterFlow: waterData?.[2]?.water_flow,
    },
    {
      date: "2021-01-04",
      ph: phData?.[3]?.pH,
      temperature: tempData?.[3]?.temperature,
      turbidity: turbidData?.[3]?.turbidity,
      dissolvedOxygen: doData?.[3]?.dissolved_oxygen,
      waterFlow: waterData?.[3]?.water_flow,
    },
    {
      date: "2021-01-05",
      ph: phData?.[4]?.pH,
      temperature: tempData?.[4]?.temperature,
      turbidity: turbidData?.[4]?.turbidity,
      dissolvedOxygen: doData?.[4]?.dissolved_oxygen,
      waterFlow: waterData?.[4]?.water_flow,
    },
    {
      date: "2021-01-06",
      ph: phData?.[5]?.pH,
      temperature: tempData?.[5]?.temperature,
      turbidity: turbidData?.[5]?.turbidity,
      dissolvedOxygen: doData?.[5]?.dissolved_oxygen,
      waterFlow: waterData?.[5]?.water_flow,
    },
    {
      date: "2021-01-07",
      ph: phData?.[6]?.pH,
      temperature: tempData?.[6]?.temperature,
      turbidity: turbidData?.[6]?.turbidity,
      dissolvedOxygen: doData?.[6]?.dissolved_oxygen,
      waterFlow: waterData?.[6]?.water_flow,
    },
  ];

  return (
    <ResponsiveContainer
      minWidth={props.minWidth}
      minHeight={props.minHeight}
      className="w-[90px] md:w-[300px] lg:w-[750px]"
    >
      <LineChart
        width={props.width}
        height={props.height}
        data={data}
        className={props.className}
        // className="h-[400px] w-[400px]"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ph" stroke="#8884d8" />
        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        <Line type="monotone" dataKey="turbidity" stroke="#ff0000" />
        <Line type="monotone" dataKey="dissolvedOxygen" stroke="#0000ff" />
        <Line type="monotone" dataKey="waterFlow" stroke="#00ff00" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Overview;
