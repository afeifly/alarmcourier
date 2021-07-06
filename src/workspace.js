import React, {useEffect} from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';

export default function Workspace(props) {
	
	const [hasAlarm, setHasAlarm] = React.useState(false);
	const {
	  value,alarm
	} = props;
	useEffect(() => {
		if((value>alarm)){
			setHasAlarm(true)
			props.alarmTriger()
		}else{
			setHasAlarm(false)
		}		
	});

	function formatXAxis(tickItem) {
			return new Date(tickItem).toLocaleTimeString("en-US");
	}
	function changeAlarmStatus(){
		setHasAlarm(!hasAlarm)
	}
	function handleDownload(){
		fetch('/download',{
			headers: {
				'Content-Type': 'application/xls'
			  },
			  responseType: 'blob'
		})
        .then(response => response.blob())
        .then(
			blob => {
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = "bac.xlsx";
				document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
				a.click();
				a.remove(); 
			}
		)
        .catch(()=>{
			
		})
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
				<LineChart
        width={600}
        height={400}
				//data={data}
		data={props.logger}
				//isAnimationActive={true}
        margin={{
          top: 20, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis 
					dataKey="time" 
					type="number"
					tickFormatter={formatXAxis}
					//allowDataOverflow={true}
					//domain={['dataMin','dataMin+3600000']}
					//domain={[0,'dataMin+3600000']}
					domain={[props.startTime,props.startTime+1*60*1000]}
					//domain={[dataMin=>formatXAxis(1539589905000),dataMax=>formatXAxis(1699589905000)]}
				/>
        <YAxis domain={[0,500]}/>
        <Tooltip />
     		<Legend payload={
					[
   				{ id:'value',value: 'Consumption', type: 'square', color: '#8884d8' } ]
 				 }/>
		{props.isAlarmSet?
        <ReferenceLine 
						y={props.alarm} 
						className={hasAlarm?'alarm-on':''}
						stroke="red" />: ''
		}
        <Line type="monotone" dataKey="value" stroke="#8884d8" 
			dot={false}
		/>
      </LineChart>
	  <div className="col-auto">
					<button className="btn btn-default"
									onClick={handleDownload}
									type="button">Download</button> 
					
				</div>
			</div>
		</div>
		</div>
	)
}
