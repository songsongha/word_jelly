	import React from 'react';
	import './TinyToken.css';

const TinyToken = ({color, number}) => {
	let circleClass = 'tinyCircle bg-';
	circleClass += color;
	return (
		<span className= 'ph1'>
			<div className= {circleClass}>
			{number}
			</div>
		</span>
		)
}
export default TinyToken
