import React, {useMemo} from 'react'
import CardFaceUp from './Cards/CardFaceUp'
import GiveClue from './Modal/GiveClue'
import CluePanel from './CluePanel/CluePanel'
import MyCards from './MyCards/MyCards'
import GuessWord from './Modal/GuessWord'
import Score from './Modal/Score'
import ClueNotification from './Modal/ClueNotification'
import ClueToken from './CluePanel/ClueToken/ClueToken'

const Play= ({ctx, G, moves, playerID, events }) => {
    const {players, words, bonusLetters, permanentLetters, gameResults, clueGiver, isClueInProgress, dummyHands} = G
    
    const cardRow = useMemo(()=>{
        // show a letter from every player other than you
        let cardRow = []
        for (let player = 0; player < players.length; player++) {
            if (player !== Number(playerID)){
                let letter = words[player][players[player].letterPosition] || bonusLetters[player]
                cardRow.push(
                    <span key = {`card${player}`} className='flex flex-column items-center display: inline-block'>
                    <CardFaceUp 
                    letter = {letter}
                    player = {players[player]}
                    word = {words[player]} />
                    </span>
                )
            }
        }
        
        for (let i = 0; i < dummyHands.length; i++) {   
            // display dummy hands
            let letter = dummyHands[i].word[dummyHands[i].letterPosition] || dummyHands[i].word[dummyHands.length-1]
            let color = 'green'
            if (dummyHands.letterPosition >= dummyHands[i].word.length-1){
                color = 'gray'
            }
            cardRow.push(
                <span key = {`dummyCard${i}`} className='flex flex-column items-center display: inline-block'>
                <CardFaceUp 
                letter = {letter}
                player = {dummyHands[i]}
                word = {dummyHands[i].word} />
                <ClueToken key={`dummyToken-${i}`} color={color}/>
                </span>
            )
        }
    return cardRow  
    },[bonusLetters, dummyHands, playerID, players, words])
    
    const permanentLetterRow = useMemo(()=>{
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
        return permanentLetterRow
    },[permanentLetters])  

	return ( 
		<div className='flex flex-row justify-between'>
			<div className = 'tc pt4 ph4 w-75'>
				<div className='mb5'> 
                    <div className='flex justify-center '>
                    {cardRow}
                    </div>
					<div>
                        <CardFaceUp letter='*' player ={{name:'Wild'}}/>
						{permanentLetterRow}
					</div>
				</div>
				<div>
					<MyCards G={G} playerID={playerID} moves={moves}/>
				</div>
                <div className='pt5 fw5 f2 moon-gray'>
                    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                </div>
				<GiveClue show={isClueInProgress && clueGiver === playerID} G={G} playerID={playerID} ctx={ctx} moves={moves}/>
                <GuessWord show={ctx.phase === 'guessWord'} ctx={ctx} onClose={()=> {}} playerID={playerID} moves={moves} />
                <Score show={gameResults[playerID].guess || ctx.phase === null} ctx={ctx} onClose={()=> {}} G={G} />
                <ClueNotification show={isClueInProgress && clueGiver && clueGiver !== playerID} G={G}/>

			</div>
			<div className = 'tc ph4 w-25'>
				<CluePanel G={G} playerID={playerID} events={events}/>
	        </div>
        </div> 
		)
}
export default Play