import React from 'react';
import TokenTracker from '../TokenTracker/TokenTracker'


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
    const clues = G.clues
    const cardPosition = G.players[playerID].letterPosition + 1
    
    if (clues) {
        for (let i = 0; i < clues.length; i++) {
            // only display the clue if the player is involved in the clue
            if (clues[i] && clues[i].length && clues[i].find(obj => obj.player === playerID)){
                let rowText = ''
                for(let j = 0; j < clues[i].length; j++){
                    rowText += clues[i][j].player !== playerID ? clues[i][j].letter.toUpperCase() + ' ' : '? '
                }
                rowText += ' (Card ' + cardPosition + ')'
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
            <TokenTracker G={G}/>
	        	{ isClueAvailable() && !G.isClueInProgress && <button id= 'giveClue' onClick = {giveClue}>Give Clue</button> }
            <h1 className='f3'>Clues</h1>
            {display}
            <br/>
        </div>
    </div>
    )
}
export default CluePanel