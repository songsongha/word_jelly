import React, { useMemo } from 'react';
import TokenTracker from './TokenTracker/TokenTracker'
import flowerOutline6 from './flowerOutline6.png'
import flowerOutline5 from './flowerOutline5.png'
import flowerOutline4 from './flowerOutline4.png'
import flowerOutline23 from './flowerOutline23.png'
import TokensTaken from './TokensTaken/TokensTaken';

const CluePanel = ({G, playerID, events}) => {
    const {tokensAvailable, tokensTaken, words, isClueInProgress} = G
    const numPlayers = G.players.length

    const isClueAvailable = () => {
        if (numPlayers < 4){
            if (tokensAvailable.leaves > 0 || 
                tokensTaken[playerID] < 6 / numPlayers || 
                (tokensAvailable.red === 0 && tokensAvailable.restricted > 0)) {
                    return true
                }
            return false
        } else {
            if (tokensAvailable.leaves > 0 || 
                tokensTaken[playerID] === 0 || 
                (tokensAvailable.red === 0 && tokensAvailable.restricted > 0)) {
                    return true
                }
            return false
        }
	}
    const giveClue = () => {
		events.endTurn({ next: playerID })
	}
    const backgroundImage = useMemo(()=>{
        const numPlayers = G.players.length
        switch (numPlayers) {
            case 2:
            case 3:
                return flowerOutline23
            case 4:
                return flowerOutline4
            case 5:
                return flowerOutline5
            case 6:
                return flowerOutline6
            default:
                console.log(`There was an error with backgroundImage`)
                return undefined
        }
    },[G.players.length])

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
                    <div key ={i} className={isPartOfClue ? '' : 'moon-gray' }>
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
            <div className='w5 h5 mb3 center' style={{ backgroundImage:`url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat:"no-repeat" }}>
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