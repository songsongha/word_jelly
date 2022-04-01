import React, { useMemo } from 'react'
import CardFaceDown from '../Cards/CardFaceDown'
import TokensTaken from '../CluePanel/TokenTracker/TokensTaken'


const MyCards = ({G, playerID, setOpenModal, moves}) => {
    const {words, players, isNextCardAvailable, isClueInProgress, gameResults} = G
    const letterPosition = players[playerID].letterPosition

    const current = useMemo(()=>{
        const nextCard = () => {
            moves.nextCard(playerID)
        }
    
        const bonusLetter = () => {
            if (players[playerID].letterPosition === words[playerID].length-1){
                moves.nextCard(playerID)
            } else {
                setOpenModal(true)
            }
        } 
        let currentCard = ''
        if (G){
            if (letterPosition >= gameResults[playerID].word.length){
                currentCard = 'Bonus'
            } else {
                currentCard = `Card ${letterPosition + 1}`
            }
        }
        return(
            <div className='w-25'>
                Current Card<br/>
                <CardFaceDown key='current' display={currentCard}/>
                <TokensTaken G={G} playerID={playerID}/>
                { isNextCardAvailable[playerID] && !isClueInProgress && 
                <div>
                    {players[playerID].letterPosition >= words[playerID].length-1 ?
                    <button id = 'bonusCard' onClick = {bonusLetter}>
                        {players[playerID].letterPosition === words[playerID].length-1 ? 'I know all my letters': 'I know this letter'}
                    </button>
                    :
                    <button id = 'nextCard' onClick = {nextCard}>
                        Next Card
                    </button> 
                    }
                </div> 
            }
            </div>
        )
    },[G, gameResults, isClueInProgress, isNextCardAvailable, letterPosition, moves, playerID, players, setOpenModal, words])
    
    const knownCards = useMemo(()=>{
    // show pile of cards that are known
    const knownCards = []
	for (let i = 0; i < letterPosition && i < words[playerID].length; i++) {
        knownCards.push(
            <CardFaceDown 
            key = {`myCard${i}`}
            display = {`Card ${i+1}`} />
        )
	  }
      return knownCards
    },[letterPosition, playerID, words])
    

return (
    <div className= 'myCards flex flex-row justify-around'>
        <div className= 'w-75'>
            Known Cards<br/>
            {knownCards}
        </div>
        {current}
    </div>
    )
}
export default MyCards