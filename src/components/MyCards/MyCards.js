import React from 'react'
import CardFaceDown from '../Cards/CardFaceDown'
import TokensTaken from '../TokenTracker/TokensTaken'


const MyCards = ({G, playerID, setOpenModal, moves}) => {
    const nextCard = () => {
		moves.nextCard(playerID)
	}

	const bonusLetter = () => {
		if (G.players[playerID].letterPosition === G.words[playerID].length-1){
			moves.nextCard(playerID)
		} else {
			setOpenModal(true)
		}
	} 
    const letterPosition = G.players[playerID].letterPosition

    let currentCard = ''
    if (G){
		if (letterPosition >= G.gameResults[playerID].word.length){
			currentCard = 'Bonus'
		} else {
			currentCard = `Card ${letterPosition + 1}`
		}
	}
    // show pile of cards that are known
    const cardRow = []
	for (let i = 0; i < letterPosition && i < G.words[playerID].length; i++) {
        cardRow.push(
            <CardFaceDown 
            key = {`myCard${i}`}
            display = {`Card ${i+1}`} />
        )
	  }

return (
    <div className= 'myCards flex flex-row justify-around'>
        <div className= 'w-75'>
            Known Cards<br/>
            {cardRow}
        </div>
        <div className='w-25'>
            Current Card<br/>
            <CardFaceDown key='current' display={currentCard}/>
            <TokensTaken G={G} playerID={playerID}/>
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
}
export default MyCards