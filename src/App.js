import React,{useRef} from 'react';
import './App.css';
import Workspace from './workspace';
import Control from './control';

function App() {
	
	const [run, setRun] = React.useState(false);
	const [value, setValue] = React.useState(100);
	const interval = useRef(false);	
	var valueInpage = 100
	function startExec() {
		setRun(true)
		valueInpage = value
		interval.current = setInterval(() => timePass(), 500);
	}
	function stopExec() {
		setRun(false)
		valueInpage = value
		clearInterval(interval.current)
		console.log(value);
	}
	function reset() {
		setRun(false)
		clearInterval(interval.current)
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

  return (
    <div className="App">
	 	<h4>默默学习</h4> 
	  <div className="container">
	  <div className="row ">
    	<div className="col-md-8">
			<Workspace 
	  		value={value}			
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
