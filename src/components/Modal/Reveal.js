import React, {useState} from 'react'
import './modal.css'

const Reveal = ({ctx, G, playerID, moves}) => {
    const [wordGuess, setWordGuess] = useState('')
    const [showTextBox, setShowTextBox] = useState(true)

    if (ctx.phase !== 'reveal'){
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
    const resultsTable = G.gameResults.map((player,index) =>{
        const {word, guess, score} = player
        return(
            <tr key={index}>
                <td>Player {index}</td>
                <td>{word}</td>
                <td>{guess}</td>
                <td>{score}</td>
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
                {showTextBox ?
                    <div>
                        What do you think your word is? <br/>
                        <input type = 'text' id = 'txtGuess'
                        value={wordGuess || ''}
                        onChange={handleChange}></input>
                    </div>

                :
                    <div className='tc'>
                        <table id='results'>
                            <tbody>
                                <tr>
                                    <th key='player'>Player</th>    
                                    <th key='word'>Word</th>
                                    <th key='guess'>Guess</th>
                                    <th key='score'>Score</th>
                                </tr>
                                

                            {resultsTable}
                            </tbody>
                        </table>
                    </div>
                    
                }
                </main>
                <footer className='modal-footer'>
                    {showTextBox && <button className='button' onClick={handleSubmit}>Submit</button>}
                </footer>
            </div>
        </div>
    )
}
export default Reveal