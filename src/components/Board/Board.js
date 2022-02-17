import React from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import ClueToken from '../ClueToken/ClueToken';
// set up board so that once everyone selects a player then we move to the input words stage

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
console.log({isActive})
    const playerReady = () => {
		
		console.log('player Ready triggered')
		// events.setPhase('inputWords')
		events.setActivePlayers({ all: 'inputWords', minMoves: 1, maxMoves: 1})
      }

	const submitWord = () => {
		
		console.log('input word triggered')
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
	return ( 
		<div className = 'tc pa4'>
			<div> 
	          	<CardFaceUp letter={G.letter}/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
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
	        	<CardFaceDown/><br/>
	        	<button>Next Card</button>
	        </div>

        </div> 
		)
	} else {
		return (
			<div className='tc'>
				<button id = 'btnSubmit'onClick={playerReady}>Ready</button>
			</div>
		)	
	}
}
export default Board