import React, { useMemo } from 'react'
import ClueToken from '../ClueToken/ClueToken';
import { determineColor, determineLayout } from './TokenTrackerHelper';

const TokenTracker = ({G}) => {
    // const {tokensAvailable} = G 
    
    // const numPlayers = G.players.length
    
    const display = useMemo(()=>{
        const numPlayers = 3
        const tokensAvailable = {
            red: 6,
            leaves: 2,
            restricted: 3 
        }
        const layout = determineLayout(numPlayers)
        console.log({layout})
        switch (numPlayers) {
            case 2:
            case 3:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 flex justify-around pt2 ph5'>
                            <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                            <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2 flex justify-center'>
                            <span className='pt3'>
                                <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                            </span>
                            <span className='flex flex-column pt1'>
                                <div>
                                    <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                                </div>
                                <div>
                                    <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>    
                                    <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                                </div>
                            </span>
                            <span className='pt3'>
                                <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                            </span>
                        </div>
                        <div className='row3 flex justify-around pv2 ph5 mb4'>
                            <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                            <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        </div>
                        <div className='row4 flex justify-around mt4 p2 ph5'>
                            <span className='pt3'>
                            <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                            </span>
                            <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            case 4:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 flex justify-around mh2 pt3 ph5 pb1'>
                            <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                            <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                        </div>
                        <div className='row2'>
                            <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                        </div>
                        <div className='row3 flex justify-around mh2 ph5 pb2'>
                            <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                            <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                        </div>
                        <div className='row4 flex justify-between mt4 ph4'>
                            <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                            <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                        </div>
                        <div className='row5 flex justify-around pt1 ph3'>
                            <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                            <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                        </div>
                        <div className='row6 flex justify-around ph5'>
                            <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                            <ClueToken key='token-10' color ={determineColor(tokensAvailable,layout, 10)}/>
                        </div>
                    </div>
                )
            case 5:
                return(
                    <div className= 'tokenTracker'>
                        <div className='row1 pt2 pl3'>
                            <ClueToken key='token-0' color ={determineColor(tokensAvailable,layout, 0)}/>
                        </div>
                        <div className='row2 flex justify-center pl2 pt1'>
                            <ClueToken key='token-1' color ={determineColor(tokensAvailable,layout, 1)}/>
                            <span className='flex items-center pt2'>
                                <ClueToken key='token-2' color ={determineColor(tokensAvailable,layout, 2)}/>
                            </span>
                            <ClueToken key='token-3' color ={determineColor(tokensAvailable,layout, 3)}/>
                        </div>
                        <div className='flex justify-around row3 ml3 mr1 pl5 pr5 pt1'>
                            <ClueToken key='token-4' color ={determineColor(tokensAvailable,layout, 4)}/>
                            <ClueToken key='token-5' color ={determineColor(tokensAvailable,layout, 5)}/>
                        </div>
                        <div className='row4 flex justify-between pl4 pr2 mt4 ml3 mr4 pt1'>
                            <ClueToken key='token-6' color ={determineColor(tokensAvailable,layout, 6)}/>
                            <ClueToken key='token-7' color ={determineColor(tokensAvailable,layout, 7)}/>
                        </div>
                        <div className='row5 flex justify-between ml5 pl2 pr5'>
                            <ClueToken key='token-8' color ={determineColor(tokensAvailable,layout, 8)}/>
                            <ClueToken key='token-9' color ={determineColor(tokensAvailable,layout, 9)}/>
                        </div>
                        <div className='row6 pl4'>
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