import React, {useState, useEffect} from 'react'
import CardFaceUp from '../Cards/CardFaceUp'
import GiveClue from '../Modal/GiveClue'
import Reveal from '../Modal/Reveal'
import CluePanel from '../CluePanel/CluePanel'
import GuessBonus from '../Modal/GuessBonus'
import MyCards from '../MyCards/MyCards'
import { useParams } from 'react-router-dom'
import GameSetUp from '../GameSetUp/GameSetUp'

const Board = ({ ctx, G, moves, playerID, isActive, events }) => {
	const {players, words, bonusLetters, permanentLetters} = G
	const [openModal, setOpenModal] = useState(false)
	const [openGuessBonus, setOpenGuessBonus] = useState(false)
	let { wordLength } = useParams()
	
	const waitTable = G.players.map((player,index, array) =>{
		const {name, submittedWord} = player

		return(
			<tr key={index}>
				<td className='ph3'>{name}</td>
				<td className={`${submittedWord ? 'green': ''}`}>{submittedWord ? 'Ready' : 'Not yet joined'}</td>
			</tr>
		)  
	})

if (ctx.phase === 'setUp' && players && players[playerID] && !players[playerID].submittedWord){
	return ( 
		<GameSetUp wordLength={wordLength} moves={moves} playerID={playerID} />
		)
} else if (ctx.phase === 'setUp' && players && players[playerID] && players[playerID].submittedWord){
	return ( 
		<div className='tc'>
			Waiting for other players join and enter words
			<table id='wait' className='center pt4'>
				<tbody>
					<tr>
						<th key='player'className='ph3'>Player</th>    
						<th key='ready'className='ph3'>Status</th>
					</tr>
				{waitTable}
				</tbody>
			</table>
		</div>
		)
}else if (ctx.phase === 'play' || ctx.phase === 'reveal') {
	let cardRow = []
	let wildCard = {
		name: 'Wild'
	}
	
	// show a letter from every player other than you
	for (let player = 0; player < players.length; player++) {
		if (player !== Number(playerID)){
			let letter = words[player][players[player].letterPosition] || bonusLetters[player]

			cardRow.push(
				<CardFaceUp 
				key = {`card${player}`}
				letter = {letter}
				player = {players[player]}
				word = {words[player]} />
			)
		}
	  }
	
	// show permanent letters if applicable
	const permanentLetterRow = []
	if (permanentLetters && permanentLetters.length){
		for (let letterIndex = 0; letterIndex < permanentLetters.length; letterIndex++){
			if (permanentLetters && permanentLetters.length){
				permanentLetterRow.push(
					<CardFaceUp 
					key = {`pLetter${letterIndex}`}
					letter = {permanentLetters[letterIndex]}
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