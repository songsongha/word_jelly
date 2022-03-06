	import React from 'react';
	import './Cards.css';

const CardFaceDown = ({G, playerID}) => {
	
	let display = ''
	if (G){
		const letterPosition = G.players[playerID].letterPosition
		if (letterPosition >= G.players[playerID].word.length){
			display = 'Bonus'
		} else {
			display = `Card ${letterPosition + 1}`
		}
	}
	
	return (
		<div className= 'card tc bg-white black dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h1 className='cardBack f3'>Word <br/>Jelly</h1>
				<p> {display}</p>
			</div>
		</div>
		)
}
export default CardFaceDown

