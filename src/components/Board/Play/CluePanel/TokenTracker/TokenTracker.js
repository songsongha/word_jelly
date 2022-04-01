import React from 'react'
import ClueToken from '../ClueToken/ClueToken';

const TokenTracker = ({G}) => {
    // number of clues available is dependent on number of players playing; 11 is available in 6 player version
    const redLayout = [0,1,2,4,5,6]
    const leavesLayout = [7,8,9,10]
    const restrictedLayout = [3]

    const determineColor = (position) => {
        if (redLayout.includes(position) && redLayout.findIndex(e => e === position ) < G.tokensAvailable.red){
            return 'red'
        } else if ((leavesLayout.includes(position) && leavesLayout.findIndex(e => e === position ) < G.tokensAvailable.leaves) ||
         (restrictedLayout.includes(position) && restrictedLayout.findIndex(e => e === position ) < G.tokensAvailable.restricted)){
            return 'green'
        }  
        return 'gray'
    }


return (
    <div className= 'tokenTracker'>
        <div className='row1 pt3 pb2'>
        <ClueToken key='token-0' color ={determineColor(0)}/>
        <ClueToken key='token-1' color ={determineColor(1)}/>
        </div>
        <div className='row2 pb2'>
        <ClueToken key='token-2' color ={determineColor(2)}/>
        <ClueToken key='token-3' color ={determineColor(3)}/>
        <ClueToken key='token-4' color ={determineColor(4)}/>
        </div>
        <div className='row3'>
        <ClueToken key='token-5' color ={determineColor(5)}/>
        <ClueToken key='token-6' color ={determineColor(6)}/>
        </div>
        <div className='row4 mt4 ml6 pt1 pl2'>
        <ClueToken key='token-7' color ={determineColor(7)}/>
        </div>
        <div className='row5 flex justify-around pl3 pr4'>
        <ClueToken key='token-8' color ={determineColor(8)}/>
        <ClueToken key='token-9' color ={determineColor(9)}/>
        </div>
        <div className='row6 pr5'>
        <ClueToken key='token-10' color ={determineColor(10)}/>
        </div>
    </div>
    )
}
export default TokenTracker