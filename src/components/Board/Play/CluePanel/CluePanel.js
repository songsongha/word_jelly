import React, { useMemo } from 'react';
import TokenTracker from './TokenTracker/TokenTracker'
import flowerOutline from './flowerOutline2.png'

const CluePanel = ({G, playerID, setOpenModal, events}) => {
    const {tokensAvailable, tokensTaken, words, isClueInProgress} = G

    const isClueAvailable = () => {
		if (tokensAvailable.leaves > 0 || 
			tokensTaken[playerID] === 0 || 
			(tokensAvailable.red === 0 && tokensAvailable.restricted > 0)) {
				return true
			}
		
		return false
	}
    const giveClue = () => {
		events.endTurn({ next: playerID })
		setOpenModal(true)
	}
    const display = useMemo(()=>{
        const display = []
        const clues = [...G.clues]

        if (clues) {
            for (let i = 0; i < clues.length; i++) {
                // only display the clue if the player is involved in the clue
                if (clues[i] && clues[i].length && clues[i].find(obj => obj.player === playerID)){
                    let letterPositionArray = []
                    let rowText = ''
                    for(let j = 0; j < clues[i].length; j++){
                        if (j === 0){
                            letterPositionArray = [...clues[i][j]]
                        } else {
                            rowText += clues[i][j].player !== playerID ? clues[i][j].letter.toUpperCase() + ' ' : '? '
                        }
                    }
                    
                    const cardNo = letterPositionArray[playerID] + 1
                    if (cardNo <= words[playerID].length){
                        rowText += ' (Card ' + cardNo + ')'
                    } else {
                        rowText+= ' (Bonus)'
                    }
                    display.push(
                        <div key ={i}>
                            {rowText}
                        </div>
                    )
                }
            }
        }
        return display
    },[G.clues, playerID, words])
    

return (
    <div className= 'cluePanel'>
        <div>
            <h1 className='title'>Clues</h1>
            <div className='w5 h5 mb3 center' style={{ backgroundImage:`url(${flowerOutline})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat:"no-repeat" }}>
                <TokenTracker G={G}/>
            </div>
	        { isClueAvailable() && !isClueInProgress && <button id= 'giveClue' onClick = {giveClue}>Give Clue</button> }
            <h4>Clues Received:</h4>
            {display}
            <br/>
        </div>
    </div>
    )
}
export default CluePanel