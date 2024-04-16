import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 2780 },
  { month: "May", revenue: 1890 },
  { month: "Jun", revenue: 2390 },
  { month: "Jul", revenue: 3490 },
  { month: "Aug", revenue: 4500 },
  { month: "Sep", revenue: 3600 },
  { month: "Oct", revenue: 2700 },
  { month: "Nov", revenue: 3800 },
  { month: "Dec", revenue: 4200 },
];

export default function Revenue() {
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
        <YAxis dataKey="revenue" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          // stroke="#8884d8"
          stroke = "#0f2bdb"
          activeDot={{ r: 12 }}
          name="Total Revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
