import React from 'react'
import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
// https://recharts.org/en-US/examples/StraightAnglePieChart


const Dash = () => {
  const data = [
    { label: 'January', sales: 21, leads: 41 },
    { label: 'February', sales: 35, leads: 79 },
    { label: 'March', sales: 75, leads: 57 },
    { label: 'April', sales: 51, leads: 47 },
    { label: 'May', sales: 41, leads: 63 },
    { label: 'June', sales: 47, leads: 71 }
  ];

  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  const data3 = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (<>
    <div>Dash</div>
    <div className="row">
      <div className="col-md-12">
        <h2>Charts with recharts library</h2>
      </div>

      <div className="section col-md-6">
        <h3 className="section-title">Line Chart</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <Tooltip />
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#FB8833" />
              <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section col-md-6">
        <h3 className="section-title">Bar Chart</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data2} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#FB8833" />
              <Bar dataKey="leads" fill="#17A8F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <PieChart width={400} height={400}>
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

      <PieChart width={400} height={400}>
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

      <PieChart width={400} height={400}>
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
      
      <PieChart width={400} height={400}>
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

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data3}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>

    </div>
    <Link to="/Admin">Home</Link>
  </>)
}

export default Dash
