import React from 'react';


const CardFaceUp = ({letter, player}) => {
console.log({player})
	let cardNo =  ''
	if (player){
		cardNo = `Card ${player.letterPosition + 1}`
	} else if (player && (player === 'bonus' || player.letterPosition > player.word.length)){
		cardNo = 'Bonus'
	}

 	if (!letter){
		letter = 'A'
	} else {
		letter = letter.toUpperCase()
	}
	return (
		<div className= 'card tc bg-dark-gray white dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h1>{letter} </h1>
				<p> {player && player.name ? player.name : '' }</p>
				<p> {cardNo} </p>
			</div>
		</div>
		)
}
export default CardFaceUp