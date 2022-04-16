import React from 'react';


const CardFaceUp = ({letter, player, word}) => {
	let cardNo =  ''
	if (player && word && player.letterPosition < word.length){
		console.log('word length',word.length)
		cardNo = `Card ${player.letterPosition + 1}/${word.length}`
	} else if (player && word && player.letterPosition >= word.length){
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
				<p> {player && player.name ? player.name : 'Bonus' }</p>
				<p> {cardNo} </p>
			</div>
		</div>
		)
}
export default CardFaceUp