import React, {useState, useEffect, useCallback} from 'react'
import './modal.css'

const GuessBonus = ({show, onClose, G, playerID, moves}) => {
    const {bonusLetters} = G
    const [bonusGuess, setBonusGuess] = useState('')

    const handleSubmit = useCallback(() => {
        let isBonusCorrect = false
        if (bonusGuess.toUpperCase() === bonusLetters[playerID].toUpperCase()){
            isBonusCorrect = true
        }
        moves.nextCard(playerID, isBonusCorrect)
        onClose()
    },[bonusLetters, bonusGuess, moves, onClose, playerID])

    const handleCancel = () => {
        setBonusGuess('')
        onClose()
    }

    const handleChange = (event) => {
        setBonusGuess(event.target.value)
      }

    useEffect(() => {
        if (show){
            const listener = event => {
                if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                    event.preventDefault();
                    handleSubmit()
                }
            }
            document.addEventListener('keydown', listener)
            return () => {
                document.removeEventListener('keydown', listener)
            }
        }
    }, [handleSubmit, show])
    
    if (!show){
        return null
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Guess Bonus Letter</h4>
                </header>
                <main className='modal-body'>
                    My letter is: <input type = 'text' id = 'txtGuess' autoFocus
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