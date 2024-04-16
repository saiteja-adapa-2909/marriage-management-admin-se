import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", sales: 40 },
  { month: "Feb", sales: 33 },
  { month: "Mar", sales: 20 },
  { month: "Apr", sales: 27 },
  { month: "May", sales: 18 },
  { month: "Jun", sales: 23 },
  { month: "Jul", sales: 34 },
  { month: "Aug", sales: 45 },
  { month: "Sep", sales: 36 },
  { month: "Oct", sales: 27 },
  { month: "Nov", sales: 38 },
  { month: "Dec", sales: 42 },
];

export default function Sales() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(value) => value.substr(0, 3)}
        ></XAxis>
        <YAxis
          dataKey="sales"
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#0f2bdb"
          activeDot={{ r: 12 }}
          name="Total Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
