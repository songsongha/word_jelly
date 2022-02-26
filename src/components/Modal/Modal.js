import React from 'react'
import './modal.css'

const Modal = ({show, onClose, G, playerID}) => {
    if (!show){
        return null
    }
    // drop down menu options for each player, plus wild option
    const dropDownOptions = []
    dropDownOptions.push(
        <option key='blank' value='blank'>
        </option>
    )
    for (let player = 0; player < G.players.length; player++) {
		if (player !== Number(playerID)){
			dropDownOptions.push( 
                <option key={player} value={G.words[player][G.players[player].letterPosition]}>
                    {G.words[player][G.players[player].letterPosition].toUpperCase()+' '}
                    (
                    {G.players[player].name}) 
                </option>
			)
		}
	  }
    dropDownOptions.push(
        <option key='wild' value='*'>
            *   (wild)
        </option>
    )  
    const clueForm = []
    for (let i = 1; i <= 8; i++) {
        clueForm.push(
            <div>
                Clue {i}
                <select key={i}>
                    {dropDownOptions}
                </select>
            </div>
        )
    }  
  
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Give Clue</h4>
                </header>
                <main className='modal-body'>
                    {clueForm}
                </main>
                <footer className='modal-footer'>
                    <button className='button' onClick={onClose}>Close</button>
                </footer>
            </div>
        </div>
    )
}
export default Modal