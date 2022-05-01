import React, {useMemo} from 'react'
import TinyToken from './TinyToken/TinyToken'

const TokensTaken = ({G}) => {
    const {players, tokensTaken} = G
    const numPlayers = G.players.length

    const tokenTable = useMemo(() => {
        const tokenTable = players.map((player,index) =>{
            const display = []
            if (tokensTaken[index] === 0){
                display.push(<div key={index}className='gray m0 p0'>None</div>)
            } else {
                for (let i = 0; i < tokensTaken[index]; i++){
                    let color = 'red'
                    if ((numPlayers > 3 && i > 0) ||
                         (numPlayers === 3 && i > 1 ) || 
                         (numPlayers === 2 && i > 2)){
                        color = 'green'
                    }
                    display.push(
                        <TinyToken key={`tokenUsed-${i}`} color ={color}/>
                    )
                }
            }
            return(
                <tr key={index}>
                    <td className='pl3 pr2 f6 tl'>{player.name}</td>
                    <td className='pl3 f6 flex'>{display}</td>
                </tr>
            )
        })
        return tokenTable
    },[players, tokensTaken])

return (
    <div className= 'TokensTaken ml5'>
        <table id='TokensTaken'>
            <tbody>
                <tr>
                    <th key='player'className='ph2 f6 fw6 tl'>Player</th>    
                    <th key='word'className='ph2 f6 fw6 tl'>Tokens Taken</th>
                </tr>
                {tokenTable}
            </tbody>
        </table>
    </div>
    )
}
export default TokensTaken