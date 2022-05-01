import React, { useMemo } from 'react';
import TokenTracker from './TokenTracker/TokenTracker'
import flowerOutline6 from './flowerOutline6.png'
import flowerOutline5 from './flowerOutline5.png'
import flowerOutline4 from './flowerOutline4.png'
import flowerOutline23 from './flowerOutline23.png'
import TokensTaken from './TokensTaken/TokensTaken';

const CluePanel = ({G, playerID, events}) => {
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
	}
    const display = useMemo(()=>{
        const display = []
        const clues = [...G.clues]
        if (clues) {
            for (let i = 0; i < clues.length; i++) {
                const isPartOfClue = clues[i] && clues[i].length && clues[i].find(obj => obj.player === playerID)? true : false
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
                // only display card reference if player is involved in the clue
                if (isPartOfClue){
                    if (cardNo <= words[playerID].length){
                        rowText += ' (Card ' + cardNo + ')'
                    } else {
                        rowText+= ' (Bonus)'
                    }
                }
                display.push(
                    <div key ={i} className={isPartOfClue ? '' : 'moon-gray strike' }>
                        {rowText}
                    </div>
                )
            }
        }
        return display
    },[G.clues, playerID, words])
    

return (
    <div className= 'cluePanel'>
        <div>
            <h1 className='title'>Clues</h1>
            <div className='w5 h5 mb3 center' style={{ backgroundImage:`url(${flowerOutline23})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat:"no-repeat" }}>
                <TokenTracker G={G}/>
            </div>
            <div className='center'>
                <TokensTaken G={G} />
            </div>
	        { isClueAvailable() && !isClueInProgress && 
            <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
                id= 'giveClue' 
                onClick = {giveClue}>
                    Give Clue</button> }
            <h4 className='fw5'>Clues Received:</h4>
            {display}
            <br/>
        </div>
    </div>
    )
}
export default CluePanel