import React,{useRef,useEffect} from 'react';
import './App.css';
import Workspace from './workspace';
import Control from './control';

function App() {
	
	const [run, setRun] = React.useState(false);
	const [value, setValue] = React.useState(100);
	const [logger, setLogger] = React.useState([]);
	const updateValueInterval = useRef(false);	
	const loggerInterval = useRef(false);	
	var valueInpage = 100
	var timestamp = -1
	useEffect(() => {
		// Update the document title using the browser API
		console.log("---------------- app")
		timestamp = Date.now()
		console.log(timestamp)
		//timestamp = 1000 * (timestamp/1000)
		timestamp = parseInt(timestamp / 1000) *1000
		console.log("start timestamp  = "+timestamp)	
		oneLogger();

	  });
	function startExec() {
		setRun(true)
		var time = Date.now()
		console.log(time)
		var timestr = new Date(time).toLocaleTimeString("en-US");
		console.log(timestr)
		valueInpage = value
		updateValueInterval.current = setInterval(() => timePass(), 500);
		//startLoggerInterval()
		
		timestamp = Date.now()
		console.log(timestamp)
		//timestamp = 1000 * (timestamp/1000)
		timestamp = parseInt(timestamp / 1000) *1000
		console.log("start timestamp  = "+timestamp)	
		oneLogger();
	}
	function stopExec() {
		setRun(false)
		valueInpage = value
		clearInterval(updateValueInterval.current)
		console.log(value);
	}
	function reset() {
		setRun(false)
		clearInterval(updateValueInterval.current)
		setValue(100)
		valueInpage = 100
	}
	function timePass(){
		let newValue = valueInpage + Math.ceil(Math.random()*10)
		console.log(value);
		valueInpage = newValue
		//setValue(value+Math.ceil(Math.random()*10))
		setValue(newValue)
	}
	function startLoggerInterval(){
		//Get a record every second from valueInpage
		//get time of first 
		timestamp = Date.now()
		console.log(timestamp)
		//timestamp = 1000 * (timestamp/1000)
		timestamp = parseInt(timestamp / 1000) *1000
		console.log("start timestamp  = "+timestamp)
		loggerInterval.current = setInterval(() => oneLogger(), 1000);
	}
	function oneLogger(){
		timestamp = timestamp + 1000
			let obj = {
				time: timestamp,
				value: valueInpage,
			}

			console.log(obj)		
			// setLogger(...logger,{
			// 	time: timestamp+1000,
			// 	value: valueInpage,
			// })
			var loggers = [];
			loggers = logger;
			loggers.push(obj)
			setLogger(loggers)
			//setLogger(...logger , obj)
			console.log(logger)
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
