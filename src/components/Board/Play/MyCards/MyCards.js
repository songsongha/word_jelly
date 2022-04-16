import React, { useMemo, useState } from 'react'
import GuessBonus from '../Modal/GuessBonus'
import CardFaceDown from '../Cards/CardFaceDown'
import TokensTaken from '../CluePanel/TokenTracker/TokensTaken'

const MyCards = ({G, playerID, moves}) => {
    const {words, players, isNextCardAvailable, isClueInProgress, gameResults} = G
    const letterPosition = players[playerID].letterPosition
    const [formValues, setFormValues] = useState({})
    const [currentValue, setCurrentValue] = useState('')
    const [openGuessBonus, setOpenGuessBonus] = useState(false)

    const current = useMemo(()=>{
        const nextCard = () => {
            setFormValues(values => ({...values, [`note${letterPosition}`]: currentValue}))
            setCurrentValue('')
            moves.nextCard(playerID)
        }
        
        const bonusLetter = () => {
            if (players[playerID].letterPosition === words[playerID].length-1){
                setFormValues(values => ({...values, [`note${letterPosition}`]: currentValue}))
                setCurrentValue('')
                moves.nextCard(playerID)
            } else {
                setOpenGuessBonus(true)
                //need to clear current value after guess bonus closes
            }
        } 

        const handleChange = (event) => {
            const value = event.target.value;
            setCurrentValue(value)
          }
        let currentCard = ''
        if (G){
            if (letterPosition >= gameResults[playerID].word.length){
                currentCard = 'Bonus'
            } else {
                currentCard = `Card ${letterPosition + 1}/${words[playerID].length}`
            }
        }
        return(
            <div className='w-25'>
                Current Card<br/>
                <CardFaceDown key='current' display={currentCard}/><br/>
                <input
                type='text'
                name={`note`}
                value={currentValue}
                onChange={handleChange}
                placeholder='Notes'
                className={'w3'}
              />
                <TokensTaken G={G} playerID={playerID}/>
                { isNextCardAvailable[playerID] && !isClueInProgress && 
                <div>
                    {players[playerID].letterPosition >= words[playerID].length-1 ?
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'id = 'bonusCard' onClick = {bonusLetter}>
                        {players[playerID].letterPosition === words[playerID].length-1 ? 'I know all my letters': 'I know this letter'}
                    </button>
                    :
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' id = 'nextCard' onClick = {nextCard}>
                        Next Card
                    </button> 
                    }
                </div> 
            }
            </div>
        )
    },[G, currentValue, gameResults, isClueInProgress, isNextCardAvailable, letterPosition, moves, playerID, players, words])
    
    const knownCards = useMemo(()=>{
    // show pile of cards that are known
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
      }

    const knownCards = []
	for (let i = 0; i < letterPosition && i < words[playerID].length; i++) {
        knownCards.push(
            <div key={`myCard${i}`}>
                <CardFaceDown 
                display = {`Card ${i+1}/${words[playerID].length}`} /><br/>
                <input
                type='text'
                name={`note${i}`}
                value={formValues[`note${i}`] || ''}
                onChange={handleChange}
                placeholder='Notes'
                className={'w3'}
              />
            </div>
        )
	  }
      return knownCards
    },[formValues, letterPosition, playerID, words])
    
    const handleClose = () => {
        setOpenGuessBonus(false)
        setCurrentValue('')
    }

return (
    <div className= 'myCards flex flex-row justify-around'>
        <div>
            Known Cards <br/>
            <div className= 'flex flex-wrap'>
                {knownCards}
            </div>
        </div>
        {current}
        <GuessBonus show={openGuessBonus} onClose={handleClose} G={G} playerID={playerID} moves={moves} />
    </div>
    )
}
export default MyCards