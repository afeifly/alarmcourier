import React, {useEffect} from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';

export default function Workspace(props) {
	useEffect(() => {
		// Update the document title using the browser API
		console.log("---------------- workspace")
		console.log(data)
		console.log(props.logger)
	  });
	const data = [
		{
		  time: 1579493816000,name:'Page A', uv: 4000, pv: 2400, amt: 2400,
		},
		{
		  time: 1579493817000,name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
		},
		{
		  time: 1579493818000,name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
		},
		{
		  time: 1579493819000,name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
		},
		{
		  time: 1579493820000,name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
		},
		{
		  time: 1579493821000,name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
		}
	  ];

	  function formatXAxis(tickItem) {
		// If using moment.js
		return new Date(tickItem).toLocaleTimeString("en-US");
		}
	return (
		<div>
		<div className="card card-width"	>
			<div className="card-body">
				<h5 className="card-title">Consumption</h5>
				<p className="card-text">{props.value}<b> m³
</b></p>
			</div>
		</div>
		<div className="card "	>
			<div className="card-body">
				<h5 className="card-title">Consumption</h5>
				<LineChart
        width={500}
        height={300}
		//data={data}
		data={props.logger}
        margin={{
          top: 20, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" 
			tickFormatter={formatXAxis}/>
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" /> */}
        <ReferenceLine y={8800} label="Max" stroke="red" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={<CustomizedDot />} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
			</div>
		</div>
		</div>
	)
}
const CustomizedDot = (props) => {
	const {
	  cx, cy, stroke, payload, value,
	} = props;
  
	if (value > 2500) {
	  return (
		<svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
			<path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
		</svg>
	  );
	}
  
	return (
		""
	);
  };