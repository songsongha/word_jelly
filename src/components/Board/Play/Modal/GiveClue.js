import React, {useState} from 'react'
import './modal.css'

const GiveClue = ({show, G, playerID, moves}) => {
    const [formValues, setFormValues] = useState({})

    if (!show){
        return null
    }
    // drop down menu options for each player, plus wild option
    const dropDownOptions = []
    dropDownOptions.push(
        <option key='blank' name='' value=''>
        </option>
    )
    for (let player = 0; player < G.players.length; player++) {
        const letter = G.words[player][G.players[player].letterPosition] || G.bonusLetters[player]
		if (player !== Number(playerID)){
			dropDownOptions.push( 
                <option key={player} name={player} value={player}>
                    {letter.toUpperCase() + ' '}
                    (
                    {G.players[player].name}) 
                </option>
			)
		}
	  }
    if (G.permanentLetters){
        G.permanentLetters.forEach((letter, index) => {
            dropDownOptions.push(
                <option key={`bonus${index}`} name={`bonus${index}`} value={letter}> 
                        {letter.toUpperCase() + ' (Bonus)'}
                    </option>
            )
        })
        
    }
    dropDownOptions.push(
        <option key='wild' name='wild' value='*'>
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
            <div key={`Clue${i}`}>
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
        const submission = {
            formValues: {...formValues},
            playerID
        }
        moves.giveClue(submission)
        setFormValues({})
    }
    const handleCancel = () => {
        moves.cancelClue(G)
        setFormValues({})
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
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-moon-gray grow pointer f6 dib' onClick={handleCancel}>Cancel</button>
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleSubmit}>Submit</button>
                </footer>
            </div>
        </div>
    )
}
export default GiveClue