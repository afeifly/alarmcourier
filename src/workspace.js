import React from 'react';

export default function Workspace(props){
	return (
		<div className="card card-width"	>
  			<div className="card-body">
			    <h5 className="card-title">Consumption</h5>
			    <p className="card-text">{props.value}<b> m³
</b></p>
		  	</div>
		</div>
	)
}
