import React, {useState} from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import Modal from '../Modal/Modal'
import CluePanel from '../CluePanel/CluePanel'
import TokenTracker from '../TokenTracker/TokenTracker';
import TokensTaken from '../TokenTracker/TokensTaken';

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
	const [openModal, setOpenModal] = useState(false)
	const nextCard = () => {
		moves.nextCard(playerID)
	}

	const giveClue = () => {
		console.log('give clue called')
		events.endTurn({ next: playerID })
		setOpenModal(true)
	}

	const submitWord = () => {
		
		const name = document.getElementById('txtName').value
		const word = document.getElementById('txtWord').value 

		moves.submitWords(playerID, name, word)
      }
	
	const isClueAvailable = () => {
		if (G.tokensAvailable.leaves > 0 || 
			G.players[playerID].tokensTaken === 0 || 
			(G.tokensAvailable.red === 0 && G.tokensAvailable.restricted > 0)) {
				return true
			}
		
		return false
	}

if (ctx.phase === 'setUp' && !G.players[playerID].word){
	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName'/>
            Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitWord}>Submit</button>
		</div>
		)
} else if (ctx.phase === 'setUp' && G.players[playerID].word){
	return ( 
		<div className='tc'>
			Waiting for other players to enter words
		</div>
		)
}else if (ctx.phase === 'play') {
	let cardRow = []
	let wildCard = {
		name: 'Wild'
	}
	
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
				<div>
					<CardFaceUp letter='*' player ={wildCard}/>
				</div>
	          	<br/>
	        	<br/>
	        </div>
	        <div className = 'pa5'>
				<CluePanel G={G} playerID={playerID}/>
				<TokenTracker G={G}/>
	        	{ isClueAvailable() && !G.isClueInProgress && <button id= 'giveClue' onClick = {giveClue}>Give Clue</button> }
	        </div>
			<Modal show={openModal} onClose={() => setOpenModal(false)} G={G} playerID={playerID} ctx={ctx} moves={moves}/>
	        <div>
	        	<CardFaceDown letterPosition={G.players[playerID].letterPosition}/>
				<TokensTaken G={G} playerID={playerID}/>
				<br/>
	        	{ G.players[playerID].isNextCardAvailable && !G.isClueInProgress && <button id = 'nextCard' onClick = {nextCard}>Next Card</button> }
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