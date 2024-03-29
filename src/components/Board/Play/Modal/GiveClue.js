import React, {useCallback, useMemo, useState} from 'react'
import Confirmation from './Confirmation'
import './modal.css'

const GiveClue = ({show, G, playerID, moves}) => {
    const {dummyHands} = G
    const [formValues, setFormValues] = useState({})
    const [openConfirmation, setOpenConfirmation] = useState(false)

    const dropDownOptions = useMemo(() =>{
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
        for (let i = 0; i < G.dummyHands.length; i++) {
            let letter = dummyHands[i].word[dummyHands[i].letterPosition] || dummyHands[i].random
                dropDownOptions.push( 
                    <option key={`dummy${i}`} name={`dummy${i}`} value={dummyHands[i].id}>
                        {letter.toUpperCase() + ' '}
                        (
                        {dummyHands[i].name}) 
                    </option>
                )
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
    return dropDownOptions 
    },[G.bonusLetters, G.dummyHands.length, G.permanentLetters, G.players, G.words, dummyHands, playerID])
    
    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
      },[])

    const clueForm = useMemo(()=>{
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
        return clueForm
    },[dropDownOptions, formValues, handleChange])  
    
    const handleSubmit = () => {
        setOpenConfirmation(true)
    }
    const handleCancel = () => {
        moves.cancelClue(G)
        setFormValues({})
    }
    if (!show){
        return null
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Give Clue</h4>
                </header>
                <main className='modal-body'>
                        {clueForm}
                        <Confirmation 
                            show={openConfirmation} 
                            onClose={()=> setOpenConfirmation(false)} 
                            playerID={playerID}
                            G={G} 
                            moves={moves} 
                            formValues={formValues} 
                            setFormValues={setFormValues}/>
                </main>
                {!openConfirmation &&
                    <footer className='modal-footer'>
                        <button className='b mt3 ph3 pv2 input-reset ba b--black bg-moon-gray grow pointer f6 dib' onClick={handleCancel}>Cancel</button>
                        <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleSubmit}>Submit</button>
                    </footer>
                }
            </div>
        </div>
    )
}
export default GiveClue