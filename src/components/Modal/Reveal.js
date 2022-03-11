import React, {useState} from 'react'
import './modal.css'

const Reveal = ({show, onClose, G, playerID, moves}) => {
    const [wordGuess, setWordGuess] = useState('')

    if (!show){
        return null
    }

    const handleChange = (event) => {
        setWordGuess(event.target.value)
      }
    const handleSubmit = () => {
        if (playerID > 0 && wordGuess.toUpperCase === G.players[playerID-1].word.toUpperCase){
            console.log('wordGuess', wordGuess, 'word', G.players[playerID-1].word)
        }
        onClose()
    }
    
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Game Over!</h4>
                </header>
                <main className='modal-body'>
                    What do you think your word is? <br/>
                    <input type = 'text' id = 'txtGuess'
                    value={wordGuess || ''}
                    onChange={handleChange}></input>
                </main>
                <footer className='modal-footer'>
                    <button className='button' onClick={handleSubmit}>Submit</button>
                </footer>
            </div>
        </div>
    )
}
export default Reveal