import React, {useState} from 'react'
import CardFaceUp from './Cards/CardFaceUp'
import GiveClue from './Modal/GiveClue'
import Reveal from './Modal/Reveal'
import CluePanel from './CluePanel/CluePanel'
import GuessBonus from './Modal/GuessBonus'
import MyCards from './MyCards/MyCards'

const Play= ({ctx, G, moves, playerID, events }) => {
    const {players, words, bonusLetters, permanentLetters} = G
    const [openModal, setOpenModal] = useState(false)
	const [openGuessBonus, setOpenGuessBonus] = useState(false)
    
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
}
export default Play