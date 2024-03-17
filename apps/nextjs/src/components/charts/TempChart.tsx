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

const TempLineChart = (props: Props) => {
  // const timeoutRef = useRef(null);
  const springStore = useSpring();
  // const [arr, setArr] = useState<{ date: string; temperature: number }[]>([]);
  // const TempQuery = api.spring.findAllTemperature.useQuery();
  // console.log("Temperature: ", tempValues)

  const temperature = api.aq.getTemperature.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 5000,
  });
  // console.log(data);

  // useEffect(() => {
  //   if (timeoutRef.current !== null) {
  //     clearTimeout(timeoutRef.current);
  //   }
  //   const interval = 6000;
  //   const speed = 100;
  //   // for (let i = 0; i < interval; i++) {
  //   //   timeoutRef.current = setTimeout(() => {
  //   //     timeoutRef.current = null;
  //   //     temperature.refetch(); // eslint-disable-line
  //   //   }, i * speed);
  //   // }
  // }, []);

  return (
    <LineChart
      width={props.width}
      height={props.height}
      data={temperature.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className={props.className}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date">
        <Label value={"Date"} offset={0} position="bottom" fontSize={20} />{" "}
      </XAxis>
      <YAxis
        label={{
          value: "Temperature",
          angle: -90,
          position: "insideLeft",
          fontSize: 20,
        }}
        domain={[0, 60]}
      />
      {/* <YAxis  /> */}
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default TempLineChart;
