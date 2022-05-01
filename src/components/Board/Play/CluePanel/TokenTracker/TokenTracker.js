import React, { useMemo } from 'react'
import ClueToken from '../ClueToken/ClueToken';
import { determineColor, determineLayout } from './TokenTrackerHelper';

const TokenTracker = ({G}) => {
    const {tokensAvailable} = G 
    
    const numPlayers = G.players.length
    
    const display = useMemo(()=>{
        // const numPlayers = 5
        // const tokensAvailable = {
        //     red: 5,
        //     leaves: 5,
        //     restricted: 1 
        // }
        const layout = determineLayout(numPlayers)
        console.log({layout})
        switch (numPlayers) {
            case 2:
            case 3:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 pt3 pb2'>
                        <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                        <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2 pb2'>
                        <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                        <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                        <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                        </div>
                        <div className='row3'>
                        <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                        <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                        </div>
                        <div className='row4 mt4 ml6 pt1 pl2'>
                        <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                        </div>
                        <div className='row5 flex justify-around pl3 pr4'>
                        <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                        </div>
                        <div className='row6 pr5'>
                        <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            case 4:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 pt3 pb2'>
                        <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                        <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2 pb2'>
                        <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                        <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                        <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                        </div>
                        <div className='row3'>
                        <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                        <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                        </div>
                        <div className='row4 mt4 ml6 pt1 pl2'>
                        <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                        </div>
                        <div className='row5 flex justify-around pl3 pr4'>
                        <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                        </div>
                        <div className='row6 pr5'>
                        <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            case 5:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 pt3 pb2'>
                        <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                        <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2 pb2'>
                        <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                        <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                        <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                        </div>
                        <div className='row3'>
                        <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                        <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                        </div>
                        <div className='row4 mt4 ml6 pt1 pl2'>
                        <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                        </div>
                        <div className='row5 flex justify-around pl3 pr4'>
                        <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                        </div>
                        <div className='row6 pr5'>
                        <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            case 6:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 pt3 pb2'>
                        <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                        <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2 pb2'>
                        <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                        <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                        <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                        </div>
                        <div className='row3'>
                        <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                        <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                        </div>
                        <div className='row4 mt4 ml6 pt1 pl2'>
                        <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                        </div>
                        <div className='row5 flex justify-around pl3 pr4'>
                        <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                        </div>
                        <div className='row6 pr5'>
                        <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            default:
                console.log(`There was an error in ClueTracker`)
                return null
        }
        
    },[])

return (
    <div>
        {display}
    </div>
    )
}
export default TokenTracker