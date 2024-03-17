"use client";

import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useSpring from "~/hooks/use-spring";
import { api } from "~/trpc/react";

interface Props {
  width: number;
  height: number;
  className?: string;
}

const DOLineChart = (props: Props) => {
  const springStore = useSpring();
  const DOQuery = api.wq.getDO.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 5000,
  });
  return (
    <LineChart
      width={props.width}
      height={props.height}
      data={DOQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className={props.className}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date">
        <Label value={"Date"} offset={0} position="bottom" fontSize={20} />{" "}
      </XAxis>
      <YAxis
        label={{
          value: "Dissolved O2",
          angle: -90,
          position: "insideLeft",
          fontSize: 20,
        }}
      />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="do" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default DOLineChart;
