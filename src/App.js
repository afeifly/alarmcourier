import React,{useRef,useEffect} from 'react';
import './App.css';
import Workspace from './workspace';
import Control from './control';

function App() {
	
	const [run, setRun] = React.useState(false);
	const [value, setValue] = React.useState(100);
	const [logger, setLogger] = React.useState([]);
	const [alarm, setAlarm] = React.useState(200);
	const updateValueInterval = useRef(false);	
	const loggerInterval = useRef(false);	
	var valueInpage = 100
	var timestamp = -1

	useEffect(() => {
		timestamp = Date.now()
		timestamp = parseInt(timestamp / 1000) *1000
	  });
	function startExec() {
		setRun(true)
		var time = Date.now()
		var timestr = new Date(time).toLocaleTimeString("en-US");
		valueInpage = value
		updateValueInterval.current = setInterval(() => timePass(), 500);
		startLoggerInterval()
		
		timestamp = Date.now()
		//timestamp = 1000 * (timestamp/1000)
		timestamp = parseInt(timestamp / 1000) *1000
		//oneLogger();
	}
	function stopExec() {
		setRun(false)
		valueInpage = value
		clearInterval(updateValueInterval.current)
		clearInterval(loggerInterval.current)

	}
	function reset() {
		setRun(false)
		clearInterval(updateValueInterval.current)
		clearInterval(loggerInterval.current)
		setValue(100)
		setAlarm(200)
		valueInpage = 100
	}
	function timePass(){
		let newValue = valueInpage + Math.ceil(Math.random()*10)
		valueInpage = newValue
		//setValue(value+Math.ceil(Math.random()*10))
		setValue(newValue)
	}
	function startLoggerInterval(){
		//Get a record every second from valueInpage
		//get time of first 
		timestamp = Date.now()
		//timestamp = 1000 * (timestamp/1000)
		timestamp = parseInt(timestamp / 1000) *1000
		loggerInterval.current = setInterval(() => oneLogger(), 1000);
	}
	function oneLogger(){
		timestamp = timestamp + 1000
			let obj = {
				time: timestamp,
				value: valueInpage,
			}

			logger.push(obj)
			const newLogger = [...logger]
			newLogger.push(obj)
			setLogger(newLogger)
	}

  return (
    <div className="App">
	 	<h4>S4M alarm DEMO</h4> 
	  <div className="container">
	  <div className="row ">
    	<div className="col-md-8">
			<Workspace 
			  value={value}			
			  logger={logger}
				alarm={alarm}
	  		/>	  			
	  	</div>
	    <div className="col-md-4 ">
			<Control 
				run={run}
				startExec={startExec}
				stopExec={stopExec}
				reset={reset}
				
			/>	  		
	  	</div>
	  </div>
	 </div>
    </div>
  );
}

export default App;
