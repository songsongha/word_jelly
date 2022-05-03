import React from 'react'
import './modal.css'
import { useNavigate } from 'react-router-dom'

const Score = ({show, ctx, G}) => {
    const {tokensAvailable, gameResults, players} = G
    const navigate = useNavigate()

    if (!show){
        return null
    }

    const newGame = () => {
        navigate('/')   
    }
    const totalScore = () => { 
        const wordScore = gameResults.reduce((acc, curr) => {
            return acc + curr.score
        }, 0)
        const tokenScore =  tokensAvailable.leaves + tokensAvailable.restricted
        return wordScore + tokenScore
      }
    const resultsTable = gameResults.map((player,index, array) =>{
        const {word, guess, score} = player

        return(
            <tr key={index}>
                <td className='ph3'>{players[index].name}</td>
                <td className='ph3'>{guess ? word.toUpperCase() : ''}</td>
                <td className= {`ph3 ${score > 0 ? 'green': 'red' }`}>{guess.toUpperCase()}</td>
                {(index === 0) && <td rowSpan={array.length} className='ph3 f-subheadline'>{totalScore()}</td>}
            </tr>
        )
    })
    
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Game Over!</h4>
                </header>
                <main className='modal-body'>
                    <div className='tc'>
                        <table id='results' className='center'>
                            <tbody>
                                <tr>
                                    <th key='player'className='ph3'>Player</th>    
                                    <th key='word'className='ph3'>Word</th>
                                    <th key='guess'className='ph3'>Guess</th>
                                    <th key='score'className='ph5'> Total Score</th>
                                </tr>
                            {resultsTable}
                            </tbody>
                        </table>
                    </div>
                </main>
                <footer className='modal-footer'>
                    {ctx.gameover && <button key='newGame' className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={newGame}>New Game</button>}
                </footer>
            </div>
        </div>
    )
}
export default Score