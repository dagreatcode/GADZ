import React from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Dash.css"; // Assuming you create a CSS file for styles

const Dash = () => {
  const data = [
    { name: "1", uv: 300, pv: 456 },
    { name: "2", uv: -145, pv: 230 },
    { name: "3", uv: -100, pv: 345 },
    { name: "4", uv: -8, pv: 450 },
    { name: "5", uv: 100, pv: 321 },
    { name: "6", uv: 9, pv: 235 },
    { name: "7", uv: 53, pv: 267 },
    { name: "8", uv: 252, pv: -378 },
    { name: "9", uv: 79, pv: -210 },
    { name: "10", uv: 294, pv: -23 },
    { name: "12", uv: 43, pv: 45 },
    { name: "13", uv: -74, pv: 90 },
    { name: "14", uv: -71, pv: 130 },
    { name: "15", uv: -117, pv: 11 },
    { name: "16", uv: -186, pv: 107 },
    { name: "17", uv: -16, pv: 926 },
    { name: "18", uv: -125, pv: 653 },
    { name: "19", uv: 222, pv: 366 },
    { name: "20", uv: 372, pv: 486 },
    { name: "21", uv: 182, pv: 512 },
    { name: "22", uv: 164, pv: 302 },
    { name: "23", uv: 316, pv: 425 },
    { name: "24", uv: 131, pv: 467 },
    { name: "25", uv: 291, pv: -190 },
    { name: "26", uv: -47, pv: 194 },
    { name: "27", uv: -415, pv: 371 },
    { name: "28", uv: -182, pv: 376 },
    { name: "29", uv: -93, pv: 295 },
    { name: "30", uv: -99, pv: 322 },
    { name: "31", uv: -52, pv: 246 },
    { name: "32", uv: 154, pv: 33 },
    { name: "33", uv: 205, pv: 354 },
    { name: "34", uv: 70, pv: 258 },
    { name: "35", uv: -25, pv: 359 },
    { name: "36", uv: -59, pv: 192 },
    { name: "37", uv: -63, pv: 464 },
    { name: "38", uv: -91, pv: -2 },
    { name: "39", uv: -66, pv: 154 },
    { name: "40", uv: -50, pv: 186 },
  ];

  const data2 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="chart-container">
        {/* Pie Charts */}
        <div className="pie-charts">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <PieChart
                key={index}
                width={300}
                height={300}
                className="pie-chart"
              >
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data2}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            ))}
        </div>

        {/* Bar Chart */}
        <BarChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className="bar-chart"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </div>

      <Link to="/User" className="home-link">
        Home
      </Link>
    </>
  );
};

export default Dash;
