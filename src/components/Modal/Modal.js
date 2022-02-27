import React, {useState} from 'react'
import './modal.css'

const Modal = ({show, onClose, G, playerID}) => {
    const [formValues, setFormValues] = useState({})

    if (!show){
        return null
    }
    // drop down menu options for each player, plus wild option
    const dropDownOptions = []
    dropDownOptions.push(
        <option name='' value=''>
        </option>
    )
    for (let player = 0; player < G.players.length; player++) {
		if (player !== Number(playerID)){
			dropDownOptions.push( 
                <option name={player} value={player}>
                    {G.words[player][G.players[player].letterPosition].toUpperCase()+' '}
                    (
                    {G.players[player].name}) 
                </option>
			)
		}
	  }
    dropDownOptions.push(
        <option name='wild' value='*'>
            *   (wild)
        </option>
    )  

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
      }

    const clueForm = []
    for (let i = 1; i <= 8; i++) {
        clueForm.push(
            <div>
                Clue {i}
                <select 
                    name={`clue${i}`} 
                    value={formValues[`clue${i}`] || ''}
                    onChange={handleChange}>
                        {dropDownOptions}
                </select>
            </div>
        )
    }  
    
    const handleSubmit = () => {
        console.log({formValues})
        onClose()
    }
    const handleCancel = () => {
        setFormValues({})
        onClose()
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
                    <button className='button' onClick={handleCancel}>Cancel</button>
                    <button className='button' onClick={handleSubmit}>Submit</button>
                </footer>
            </div>
        </div>
    )
}
export default Modal