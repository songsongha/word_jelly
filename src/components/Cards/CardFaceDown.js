	import React from 'react';
	import './Cards.css';

const CardFaceDown = ({letterPosition}) => {
	return (
		<div className= 'card tc bg-white black dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h1 className='cardBack f3'>Word <br/>Jelly</h1>
				<p> Card {letterPosition}</p>
			</div>
		</div>
		)
}
export default CardFaceDown

