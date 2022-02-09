import React from 'react';


const CardFaceUp = ({letter}) => {
	console.log({letter})
	if (!letter){
		letter = 'A'
	} else {
		letter = letter.toUpperCase()
	}
	return (
		<div className= 'card tc bg-dark-gray white dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h1>{letter} </h1>
				<p> Player #</p>
			</div>
		</div>
		)
}
export default CardFaceUp