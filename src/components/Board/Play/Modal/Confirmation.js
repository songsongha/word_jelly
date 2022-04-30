import React from 'react'
import './modal.css'

const Confirmation = ({show, onClose, playerID, G, moves, formValues, setFormValues}) => {
    
    if (!show){
        return null
    }
    
    let clue = ''
    const strPlayers = []
    for (let i=0;i < G.players.length; i++){
        strPlayers[i] = `${i}`
    }
    const strDummy = []
    if (G.dummyHands && G.dummyHands.length){
        for (let i=0;i < G.dummyHands.length; i++){
            strDummy[i] = `${G.dummyHands[i].id}`
        }
    }
    const dummyUsed = []
    if (formValues){
        const players = Object.values(formValues)
        for(let i = 0; i < players.length; i++){
            if (strPlayers.includes(players[i])){
                const letter = G.words[players[i]][G.players[players[i]].letterPosition] || G.bonusLetters[players[i]]
                clue += letter
                
            } else if(strDummy.includes(players[i])){
                const dummy = Number(players[i])-G.players.length
                const letter = G.dummyHands[dummy].word[G.dummyHands[dummy].letterPosition]
                clue += letter
                if (!dummyUsed.includes(dummy)){
                    dummyUsed.push(dummy)
                }
            }
            else {
                clue+= players[i]
            }
        }
    }
    
    const handleSubmit = () => {
        console.log({dummyUsed})
        console.log({clue})
        const submission = {
            formValues: {...formValues},
            playerID,
            dummyUsed: [...dummyUsed],
            strPlayers,
            strDummy,
            word: [...clue]
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