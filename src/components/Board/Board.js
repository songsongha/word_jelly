import React, {useState} from 'react'
import CardFaceUp from '../Cards/CardFaceUp'
import GiveClue from '../Modal/GiveClue'
import Reveal from '../Modal/Reveal'
import CluePanel from '../CluePanel/CluePanel'
import GuessBonus from '../Modal/GuessBonus'
import MyCards from '../MyCards/MyCards'
import { useParams } from 'react-router-dom'

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
	const [openModal, setOpenModal] = useState(false)
	const [openGuessBonus, setOpenGuessBonus] = useState(false)
	let { wordLength } = useParams()


	const submitWord = () => {
		
		const name = document.getElementById('txtName').value
		const word = document.getElementById('txtWord').value 

		moves.submitWords(playerID, name, word)
      }

if (ctx.phase === 'setUp' && G && G.players && G.players[playerID] && !G.players[playerID].submittedWord){
	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName'/>
            {wordLength !== 'open' ? `${wordLength}-Letter ` : 'Any Length ' }
			Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitWord}>Submit</button>
		</div>
		)
} else if (ctx.phase === 'setUp' && G.players && G.players[playerID] && G.players[playerID].submittedWord){
	return ( 
		<div className='tc'>
			Waiting for other players to enter words
		</div>
		)
}else if (ctx.phase === 'play' || ctx.phase === 'reveal') {
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
				player = {G.players[player]}
				word = {G.words[player]} />
			)
		}
	  }
	
	// show permanent letters if applicable
	const permanentLetterRow = []
	if (G.permanentLetters && G.permanentLetters.length){
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
		<div className='flex flex-row justify-between'>
			<div className = 'tc pa4 w-75'>
				<div> 
					{cardRow}
					<div>
						<CardFaceUp letter='*' player ={wildCard}/>
						{permanentLetterRow}
					</div>
					<br/>
					<br/>
				</div>
				<div>
					<MyCards G={G} playerID={playerID} setOpenModal={setOpenGuessBonus} moves={moves}/>
				</div>
				<GiveClue show={openModal} onClose={() => setOpenModal(false)} G={G} playerID={playerID} ctx={ctx} moves={moves}/>
				<GuessBonus show={openGuessBonus} onClose={()=> setOpenGuessBonus(false)} G={G} playerID={playerID} moves={moves} />
				<Reveal ctx={ctx} onClose={()=> {}} G={G} playerID={playerID} moves={moves} />
			</div>
			<div className = 'tc pa4 w-25'>
				<CluePanel G={G} playerID={playerID} setOpenModal={setOpenModal} events={events}/>
	        </div>
        </div> 
		)
	} else {
		return (
			<div className='tc'>
				<Reveal ctx={ctx} onClose={()=> {}} G={G} playerID={playerID} moves={moves} />
			</div>
		)	
	}
}
export default Board