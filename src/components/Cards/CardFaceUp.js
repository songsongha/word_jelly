import React from 'react';


const CardFaceUp = ({letter, player}) => {
	
	let cardNo = player.letterPosition + 1 || 'N/A'

 	if (!letter){
		letter = 'A'
	} else {
		letter = letter.toUpperCase()
	}
	return (
		<div className= 'card tc bg-dark-gray white dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h1>{letter} </h1>
				<p> {player && player.name ? player.name : 'Player' }</p>
				<p> Card {cardNo}</p>
			</div>
		</div>
		)
}
export default CardFaceUp