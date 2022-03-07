import React, {useState} from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import GiveClue from '../Modal/GiveClue'
import CluePanel from '../CluePanel/CluePanel'
import TokenTracker from '../TokenTracker/TokenTracker';
import TokensTaken from '../TokenTracker/TokensTaken';
import GuessBonus from '../Modal/GuessBonus';

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
	const [openModal, setOpenModal] = useState(false)
	const [openGuessBonus, setOpenGuessBonus] = useState(false)
	const nextCard = () => {
		moves.nextCard(playerID)
	}

	const bonusLetter = () => {
		if (G.players[playerID].letterPosition === G.words[playerID].length-1){
			moves.nextCard(playerID)
		} else {
			setOpenGuessBonus(true)
		}
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
			let letter = G.words[player][G.players[player].letterPosition] || G.bonusLetters[player]

			cardRow.push(
				<CardFaceUp 
				key = {`card${player}`}
				letter = {letter}
				player = {G.players[player]} />
			)
		}
	  }
	
	// show permanent letters if applicable
	const permanentLetterRow = []
	if (G.permanentLetters && G.permanentLetters.length){
		console.log('permanent letter exists and has a length')
		for (let letterIndex = 0; letterIndex < G.permanentLetters.length; letterIndex++){
			if (G.permanentLetters && G.permanentLetters.length){
				permanentLetterRow.push(
					<CardFaceUp 
					key = {`pLetter${letterIndex}`}
					letter = {G.permanentLetters[letterIndex]}
					player = 'bonus' />
				)
			}
		}
	}  
	return ( 
		<div className = 'tc pa4'>
			<div> 
				{cardRow}
				<div>
					<CardFaceUp letter='*' player ={wildCard}/>
					{permanentLetterRow}
				</div>
	          	<br/>
	        	<br/>
	        </div>
	        <div className = 'pa5'>
				<CluePanel G={G} playerID={playerID}/>
				<TokenTracker G={G}/>
	        	{ isClueAvailable() && !G.isClueInProgress && <button id= 'giveClue' onClick = {giveClue}>Give Clue</button> }
	        </div>
			<GiveClue show={openModal} onClose={() => setOpenModal(false)} G={G} playerID={playerID} ctx={ctx} moves={moves}/>
			<GuessBonus show={openGuessBonus} onClose={()=> setOpenGuessBonus(false)} G={G} playerID={playerID} moves={moves} />
	        <div>
	        	<CardFaceDown G={G} playerID={playerID}/>
				<TokensTaken G={G} playerID={playerID}/>
				<br/>
	        	{ G.isNextCardAvailable[playerID] && !G.isClueInProgress && 
					<div>
						{G.players[playerID].letterPosition >= G.words[playerID].length-1 ?
						<button id = 'bonusCard' onClick = {bonusLetter}>
							{G.players[playerID].letterPosition === G.words[playerID].length-1 ? 'I know all my letters': 'I know this letter'}
						</button>
						:
						<button id = 'nextCard' onClick = {nextCard}>
							Next Card
						</button> 
						}
					</div> 
				}
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