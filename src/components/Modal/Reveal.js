import React, {useState} from 'react'
import './modal.css'

const Reveal = ({ctx, onClose, G, playerID, moves}) => {
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

        onClose()
    }
    
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Game Over!</h4>
                </header>
                {showTextBox &&
                    <main className='modal-body'>
                        
                        What do you think your word is? <br/>
                        <input type = 'text' id = 'txtGuess'
                        value={wordGuess || ''}
                        onChange={handleChange}></input>
                    </main>
                }
                <footer className='modal-footer'>
                    {showTextBox && <button className='button' onClick={handleSubmit}>Submit</button>}
                </footer>
            </div>
        </div>
    )
}
export default Reveal