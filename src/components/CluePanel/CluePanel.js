import React from 'react';

const CluePanel = ({clues, playerID}) => {
    let display = []
    console.log({clues})
    if (clues) {
        console.log('clues exist')
        console.log('clues.length', clues.length)
        for (let i = 0; clues[i]; i++) {
            console.log('firs for loop triggered')
            for(let j = 0; j < clues[i].length; j++){
                console.log('second for loop triggered')
                console.log('clues[i][j]', clues[i][j])
                display.push(
                    clues[i][j].player !== playerID ? clues[i][j].letter.toUpperCase() + ' ' : '? '
                )
            }
            display.push(<br/>)
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