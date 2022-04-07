import React, {useState, useEffect, useCallback} from 'react'
import './modal.css'

const GuessWord = ({show, ctx, playerID, moves}) => {
    const [wordGuess, setWordGuess] = useState('')

    const handleChange = (event) => {
        setWordGuess(event.target.value)
      }
    const handleSubmit = useCallback(() => {
        const submission = {
            playerID,
            wordGuess
        }
        moves.guessWord(submission)

    },[moves, playerID, wordGuess])

    useEffect(() => {
        if (show){
            const listener = event => {
                if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                    event.preventDefault()
                    handleSubmit()
                }
            };
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
                    <h4 className='modal-title'>Game Over!</h4>
                </header>
                <main className='modal-body'>
                    <div>
                        What do you think your word is? <br/>
                        <input type = 'text' id = 'txtGuess'
                        value={wordGuess || ''}
                        onChange={handleChange}
                        autoFocus></input>
                    </div>
                </main>
                <footer className='modal-footer'>
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' key='submit' onClick={handleSubmit}>Submit</button>
                </footer>
            </div>       
        </div>
    )
}
export default GuessWord