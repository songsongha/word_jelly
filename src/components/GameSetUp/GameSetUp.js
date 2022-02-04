import React from 'react'

const GameSetUp = ({setRoute, wordLength, setWord, setPlayerName}) => {

	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName' onChange = {event => setPlayerName(event.target.value)}/>
            Word: <input type = 'text' id = 'txtWord' onChange = {event => setWord(event.target.value)} />
            <button id = 'btnSubmit'onClick={() => setRoute('play')}>Submit</button>
		</div>
		)
}
export default GameSetUp