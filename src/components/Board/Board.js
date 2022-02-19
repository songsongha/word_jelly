import React from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import ClueToken from '../ClueToken/ClueToken';
// set up board so that once everyone selects a player then we move to the input words stage

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
	const nextCard = () => {
		moves.nextCard(playerID)
	}
	const submitWord = () => {
		
		const name = document.getElementById('txtName').value
		const word = document.getElementById('txtWord').value 

		moves.submitWords(playerID, name, word)
      }

if (ctx.phase === 'setUp' && !G.words[Number(playerID)]){
	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName'/>
            Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitWord}>Submit</button>
		</div>
		)
} else if (ctx.phase === 'setUp' && G.words[Number(playerID)]){
	return ( 
		<div className='tc'>
			Waiting for other players to enter words
		</div>
		)
}else if (ctx.phase === 'play') {
	let cardRow = []
	
	// show a letter from every player other than you
	for (let player = 0; player < G.players.length; player++) {
		if (player !== Number(playerID)){
			cardRow.push(
				<CardFaceUp 
				key = {`card${player}`}
				letter = {G.words[player][G.players[player].letterPosition]}
				player = {G.players[player]} />
			)
		}
	  }
	
	return ( 
		<div className = 'tc pa4'>
			<div> 
				{cardRow}
	          	{/* <CardFaceUp letter={G.letter}/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/> */}
	          	<br/>
	        	<br/>
	        </div>
	        <div className = 'pa5'>
	        	<ClueToken color ={'red'} number = {'1'} />
	        	<ClueToken color ={'red'} number = {'2'} /><br/>
	        	<ClueToken color ={'red'} number= {'3'}/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'red'} number= {'4'}/><br/>
	        	<ClueToken color = {'red'} number= {'5'}/>
	        	<ClueToken color = {'red'} number= {'6'}/><br/><br/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'gray'}/>
	        	<ClueToken color = {'gray'}/><br/>
	        	<button>Give Clue</button>
	        </div>
	        <div>
	        	<CardFaceDown letterPosition={G.players[playerID].letterPosition}/><br/>
	        	<button id = 'nextCard' onClick = {nextCard}>Next Card</button>
	        </div>

        </div> 
		)
	} else {
		return (
			<div className='tc'>
				Issue with phase, see console
				{console.log('phase',ctx.phase)}
			</div>
		)	
	}
}
export default Board