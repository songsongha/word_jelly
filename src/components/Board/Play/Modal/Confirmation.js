import React from 'react'
import './modal.css'

const Confirmation = ({show, onClose, playerID, G, moves, formValues, setFormValues}) => {

    if (!show){
        return null
    }
    
    let clue = ''
    const strPlayers = ['0','1','2','3','4','5']
    if (formValues){
        const players = Object.values(formValues)
        for(let i = 0; i < players.length; i++){
            if (strPlayers.includes(players[i])){
                const letter = G.words[players[i]][G.players[players[i]].letterPosition] || G.bonusLetters[players[i]]
                clue += letter
            } else {
                clue+= players[i]
            }
        }
    }
    
    const handleSubmit = () => {
        const submission = {
            formValues: {...formValues},
            playerID
        }
        moves.giveClue(submission)
        setFormValues({})
        onClose()
    }
    const handleCancel = () => {
        onClose()
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Confirm Clue</h4>
                </header>
                <main className='modal-body'>
                        Your Clue Is: <br/>
                        {clue.toUpperCase()}
                </main>
                <footer className='modal-footer'>
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-moon-gray grow pointer f6 dib' onClick={handleCancel}>Back</button>
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleSubmit}>Confirm</button>
                </footer>
            </div>
        </div>
    )
}
export default Confirmation