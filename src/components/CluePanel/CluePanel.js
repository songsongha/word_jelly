import React from 'react';

const CluePanel = ({G, playerID}) => {
    const display = []
    const clues = G.clues
    const cardPosition = G.players[playerID].letterPosition + 1
    
    if (clues) {
        for (let i = 0; clues[i]; i++) {
            // only display the clue if the player is involved in the clue
            if (clues[i].find(obj => obj.player === playerID)){
                for(let j = 0; j < clues[i].length; j++){
                    display.push(
                        clues[i][j].player !== playerID ? clues[i][j].letter.toUpperCase() + ' ' : '? '
                    )
                }
                display.push(' (Card ' + cardPosition + ')')
                display.push(<br/>)
            }
        }
    }
    console.log({display})

return (
    <div className= 'cluePanel'>
        <div>
            <h1 className='f3'>Clues</h1>
            {display}
            <br/>
        </div>
    </div>
    )
}
export default CluePanel