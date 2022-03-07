import React, {useState} from 'react'
import './modal.css'

const GuessBonus = ({show, onClose, G, playerID, moves}) => {
    const [bonusGuess, setBonusGuess] = useState('')

    if (!show){
        return null
    }
    // if input letter matches G.bonusGuess[playerID] then that letter is added to G.permanentLetters, a new bonus letter should be generated
    const handleChange = (event) => {
        setBonusGuess(event.target.value)
      }
    const handleSubmit = () => {
        let isBonusCorrect = false
        if (bonusGuess.toUpperCase === G.bonusLetters[playerID].toUpperCase){
            isBonusCorrect = true
        }
        moves.nextCard(playerID, isBonusCorrect)
        onClose()
    }
    const handleCancel = () => {
        setBonusGuess('')
        onClose()
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Guess Bonus Letter</h4>
                </header>
                <main className='modal-body'>
                    My letter is: <input type = 'text' id = 'txtGuess'
                    value={bonusGuess || ''}
                    onChange={handleChange}></input>
                </main>
                <footer className='modal-footer'>
                    <button className='button' onClick={handleCancel}>Cancel</button>
                    <button className='button' onClick={handleSubmit}>Submit</button>
                </footer>
            </div>
        </div>
    )
}
export default GuessBonus