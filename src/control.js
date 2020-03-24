import React,{useRef,useEffect} from 'react';
import courier from './static/courier.png'

export default function Control(props){
	const [alarmEnable, setAlarmEnable] = React.useState(false);
	const [alarmModify, setAlarmModify] = React.useState(false);
	const [alarmValue, setAlarmValue] = React.useState(300);
	const [receivers, setReceivers] = React.useState([]);
	
	const updateInterval = useRef(false);	

	function handleAlarmEnable(event){
		
		var alarmIn = event.target.checked
		setAlarmEnable(alarmIn)
		props.setAlarmEnable(alarmIn)
		props.changeAlarm(alarmValue)
		if(alarmIn){
			
			updateInterval.current = setInterval(() => timePass(), 2500);
		}else{
			clearInterval(updateInterval.current)
		}
		
	}
	function timePass(){
		console.log("ppppp")
		//TODO search receivers
		fetch('/subscriptions')
        .then(res => res.json())
        .then((data) => {
					console.log(data)
					if(data.length>0){
						let recs = []
						data.map( item => {
							let bean = {
								openID: item.openID,
								nickName: item.name,
								url: item.url,
							}
							recs.push(bean)
						} )
						setReceivers(recs)
					}else{
						setReceivers([])
					}
        })
        .catch(console.log)

		//setReceivers([
		//{openID: '33sdf',nickName: 'sdddds'},
		//{openID: 'dfkdjf',nickName: 'fsfdsdx'},
	//	])
	}
	function handleStart(){
		props.startExec();
	}
	function handleStop(){
		props.stopExec();
	}
	function handleReset(){
		props.reset();
		setAlarmValue(300)
		props.changeAlarm(300)
		clearInterval(updateInterval.current)
	}
	function handleAlarmChange(event){
		//TODO too often to change value
		setAlarmModify(true)
		setAlarmValue(event.target.value)
	}
	function handleAlarmModify(){

		setAlarmModify(false)
		props.changeAlarm(alarmValue)
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
    					Alarm <b className="text-info">It is highly recommended to enable alarm</b> 
  					</label>
				</div>
				<div className={alarmEnable?"col-auto ":"col-auto d-none"}>
      				<div className="input-group mb-2">
       				<input type="number" 
								onChange={handleAlarmChange}
								value={alarmValue}
								className="form-control" id="inlineFormInputGroup" placeholder="Threshold"/>
					<div className="input-group-prepend">
          			<div className="input-group-text">
					m³
        			</div>
							<span>&nbsp;</span>
							<button className={alarmModify?"btn btn-primary":"btn btn-primary d-none"} 
									onClick={handleAlarmModify}
									type="button">Modify</button> 
        			</div>
      			</div>
				<div className="col-auto">
      				<label className="" >WeChat courier</label>
			    	<label  className="card-subtitle mb-2 text-muted">Scan to join as an alarm receiver</label>
      			</div>
				
				<div className="col-auto">
					<img  className="img-circle max-w-150" alt="140x140" src={courier} />
				</div>
		{
			receivers.length>0?<h5>Subscriber</h5>:""
		}
										<ul class="list-group">
		{
			receivers.map(item => (
						<li class="list-group-item" key={item.openID}>
							<img className="img-rounded max-w-25"  src={ item.url }></img> {item.nickName}
						</li>
				)
			)
		}
					</ul>
				</div>
		  </div>
		</div>
	)
}
