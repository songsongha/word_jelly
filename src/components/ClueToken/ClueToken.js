	import React from 'react';
	import './ClueToken.css';

const ClueToken = ({color, number}) => {
	let circleClass = 'circle bg-';
	circleClass += color;
	return (
		<span className= 'pa3'>
			<div className= {circleClass}>
			{number}
			</div>
		</span>
		)
}
export default ClueToken
