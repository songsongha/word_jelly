import React, {useState, useEffect, useCallback} from 'react'
import './modal.css'

const GuessBonus = ({show, onClose, G, playerID, moves}) => {
    const {bonusLetters} = G
    const [bonusGuess, setBonusGuess] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    const [isBonusCorrect, setIsBonusCorrect] = useState(false)

    const handleNotification = useCallback(() => {
        if (bonusGuess.toUpperCase() === bonusLetters[playerID].toUpperCase()){
            setIsBonusCorrect(true)
        }
        setShowNotification(true)
    },[bonusLetters, bonusGuess, playerID])
    
    const handleSubmit = useCallback(() => {

        moves.nextCard(playerID, isBonusCorrect)
        setBonusGuess('')
        setIsBonusCorrect(false)
        showNotification(false)
        onClose()
    },[moves, playerID, isBonusCorrect, showNotification, onClose])

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
                    if (showNotification){
                    handleSubmit()
                    } else {
                    handleNotification()
                    }
                }
            }
            document.addEventListener('keydown', listener)
            return () => {
                document.removeEventListener('keydown', listener)
            }
        }
    }, [handleNotification, handleSubmit, show, showNotification])
    
    if (!show){
        return null
    }

    return (
        <div className='modal'>
            {showNotification ?
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>{isBonusCorrect ? 'Right!' : 'Too Bad!'}</h4>
                </header>
                <main className='modal-body'>
 
                    <div>
                        You guessed <p className='dib b'>{bonusGuess.toUpperCase()}</p> and your card is <p className='dib b'>{bonusLetters[playerID].toUpperCase()}</p>.<br/>
                        {isBonusCorrect ? 'This letter is now available for everyone to use when giving clues.' : 'You will be dealt a new bonus card.'}
                    </div>
                </main>
                    <footer className='modal-footer'>
                        <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleSubmit}>Got It</button>
                    </footer>
            </div>
            :
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Guess Bonus Letter</h4>
                </header>
                <main className='modal-body'>
                <div>
                My letter is: <input type = 'text' id = 'txtGuess' autoFocus
                value={bonusGuess || ''}
                onChange={handleChange}></input>                 
                </div>
                </main>
                    <footer className='modal-footer'>
                        <button className='b mt3 ph3 pv2 input-reset ba b--black bg-light-gray grow pointer f6 dib' onClick={handleCancel}>Cancel</button>
                        <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleNotification}>Submit</button>
                    </footer>
            </div>
            }
        </div>
    )
}
export default GuessBonus