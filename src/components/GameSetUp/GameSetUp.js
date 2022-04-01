import React, { useEffect }from 'react'

const GameSetUp = ({wordLength, moves, playerID}) => {
    
    const submitWord = () => {
		
		const name = document.getElementById('txtName').value
		const word = document.getElementById('txtWord').value 

		moves.submitWords(playerID, name, word)
    }
        
    useEffect(() => {
        const listener = event => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            console.log('Enter key was pressed. Run your function.');
            event.preventDefault();
            submitWord()
            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        }
    }, [])

    return ( 
        <div className='tc'>
            Name: <input type = 'text' id = 'txtName'/>
            {wordLength !== 'open' ? `${wordLength}-Letter ` : 'Any Length ' }
            Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitWord}>Submit</button>
        </div>
    )
}
export default GameSetUp