import React, {useState} from 'react'
import './modal.css'
import { useNavigate } from 'react-router-dom'

const Reveal = ({ctx, G, playerID, moves,lobbyClient}) => {
    const [wordGuess, setWordGuess] = useState('')
    const [showTextBox, setShowTextBox] = useState(true)
    const navigate = useNavigate()

    if (ctx.phase !== 'reveal' && ctx.phase !== null){
        return null
    }

    const handleChange = (event) => {
        setWordGuess(event.target.value)
      }
    const handleSubmit = () => {
        console.log('submit pressed')
        setShowTextBox(false)
        const submission = {
            playerID,
            wordGuess
        }
        moves.guessWord(submission)

    }

    const newGame = () => {
        navigate('/')   
    }
    const totalScore = () => { 
        const wordScore = G.gameResults.reduce((acc, curr) => {
            return acc + curr.score
        }, 0)
        const tokenScore =  G.tokensAvailable.leaves + G.tokensAvailable.restricted
        return wordScore + tokenScore
      }
    const resultsTable = G.gameResults.map((player,index, array) =>{
        const {word, guess, score} = player

        return(
            <tr key={index}>
                <td className='ph3'>{G.players[index].name}</td>
                <td className='ph3'>{guess ? word : ''}</td>
                <td className= {`ph3 ${score > 0 ? 'green': 'red' }`}>{guess}</td>
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
                {!ctx.gameover && showTextBox ?
                    <div>
                        What do you think your word is? <br/>
                        <input type = 'text' id = 'txtGuess'
                        value={wordGuess || ''}
                        onChange={handleChange}></input>
                    </div>

                :
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
                    
                }
                </main>
                <footer className='modal-footer'>
                    {ctx.gameover ? <button key='newGame' className='button' onClick={newGame}>New Game</button>
                        :showTextBox ? <button key='submit' className='button' onClick={handleSubmit}>Submit</button> : '' }
                </footer>
            </div>
        </div>
    )
}
export default Reveal