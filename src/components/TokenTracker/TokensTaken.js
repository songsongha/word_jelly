import React from 'react'
import ClueToken from '../ClueToken/ClueToken';

const TokensTaken = ({G, playerID}) => {
    console.log('G',G, 'playerID',playerID)
    const display = []


    // number of clues available is dependent on number of players playing; 11 is available in 6 player version
    for (let i = 0; i < G.tokensTaken[playerID]; i++){
        let color = 'red'
        if (i > 0 ){
            color = 'green'
        }
        display.push(
            <ClueToken key={`tokenTaken-${i}`} color ={color}/>
        )
    }

return (
    <div className= 'tokensTaken'>
       {display}
    </div>
    )
}
export default TokensTaken