import React from 'react'
import ClueToken from '../ClueToken/ClueToken';

const TokenTracker = ({G}) => {
    const display = []
    const redLayout = [0,1,2,4,5,6]
    const leavesLayout = [7,8,9,10]
    const restrictedLayout = [3]
    // number of clues available is dependent on number of players playing; 11 is available in 6 player version
    for (let i = 0; i < 11; i++){
        let color = 'gray'
        if (redLayout.includes(i) && redLayout.length <= G.tokens.red){
            color = 'red'
        } else if ((leavesLayout.includes(i) && leavesLayout.length <= G.tokens.leaves) ||
         (restrictedLayout.includes(i) && restrictedLayout.length <= G.tokens.restricted)){
            color = 'green'
        } 
        display.push(
            <ClueToken color ={color}/>
        )
        // probably should find a better way to format using CSS
        if(i === 1 || i === 4 || i === 6 || i === 10){
            display.push(<br/>)
        } 
        if (i === 6){
            display.push(<br/>)
        }
    }

return (
    <div className= 'tokenTracker'>
       {display}
    </div>
    )
}
export default TokenTracker