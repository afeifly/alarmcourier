import React from 'react';
import courier from './static/courier.jpg'

export default function Control(props){
	const [alarmEnable, setAlarmEnable] = React.useState(false);
	
	function handleAlarmEnable(event){
		
		setAlarmEnable(event.target.checked)
		props.setAlarmEnable(event.target.checked)
	}
	function handleStart(){
		props.startExec();
	}
	function handleStop(){
		props.stopExec();
	}
	function handleReset(){
		props.reset();
	}
	function handleAlarmChange(event){
		//TODO too often to change value
		props.changeAlarm(event.target.value)
	}
	return (
		<div className="card " >
  			<div className="card-body element-left">
			    <h5 className="card-title">Console</h5>
				<div className="col-auto">
					<button className={props.run?"btn btn-default":"btn btn-primary"} 
									onClick={handleStart}
									type="button">Start</button> 
					<button className={props.run?"btn btn-primary":"btn btn-default"} 
									onClick={handleStop}
									type="button">Stop</button> 
					<button className="btn btn-default" 
									onClick={handleReset}
									type="button">Reset</button> 
				</div>
				<div className="form-check">
					<input className="form-check-input" onChange={handleAlarmEnable} type="checkbox" value="" id="defaultCheck1" />
  					<label className="form-check-label" >
    					Alarm 
  					</label>
				</div>
				<div className={alarmEnable?"col-auto ":"col-auto d-none"}>
      				<div className="input-group mb-2">
       				<input type="number" 
								onChange={handleAlarmChange}
								className="form-control" id="inlineFormInputGroup" placeholder="Threshold"/>
					<div className="input-group-prepend">
          			<div className="input-group-text">
					m³
        			</div>
        			</div>

      			</div>
				<div className="col-auto">
      				<label className="" >WeChat courier</label>
			    	<label  className="card-subtitle mb-2 text-muted">Scan to join as an alarm receiver</label>
      			</div>
				
				<div className="col-auto">
					<img  className="img-circle max-w-250" alt="140x140" src={courier} />
				</div>
				</div>
		  </div>
		</div>
	)
}
