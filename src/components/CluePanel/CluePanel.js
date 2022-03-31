import React from 'react';
import TokenTracker from '../TokenTracker/TokenTracker'
import flowerOutline from './flowerOutline2.png'

const CluePanel = ({G, playerID, setOpenModal, events}) => {
    const isClueAvailable = () => {
		if (G.tokensAvailable.leaves > 0 || 
			G.tokensTaken[playerID] === 0 || 
			(G.tokensAvailable.red === 0 && G.tokensAvailable.restricted > 0)) {
				return true
			}
		
		return false
	}
    const giveClue = () => {
		events.endTurn({ next: playerID })
		setOpenModal(true)
	}
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
                if (cardNo <= G.words[playerID].length){
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

return (
    <div className= 'cluePanel'>
        <div>
            <div className='w5 h5 mb3 center' style={{ backgroundImage:`url(${flowerOutline})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat:"no-repeat" }}>
                <TokenTracker G={G}/>
            </div>
	        { isClueAvailable() && !G.isClueInProgress && <button id= 'giveClue' onClick = {giveClue}>Give Clue</button> }
            <h1 className='f3'>Clues</h1>
            {display}
            <br/>
        </div>
    </div>
    )
}
export default CluePanel